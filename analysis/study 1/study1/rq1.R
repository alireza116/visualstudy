library(plyr)
library(dplyr)
library(ggplot2)
library(statsr)
library("lme4")
library(report)
library(tidyverse)
library(sjPlot)
library(sjlabelled)
library(sjmisc)
library(rjson)
library(glmmTMB)
theme_set(theme_sjplot())
library(scales)

df = read.csv("rq1AccResponses.csv")
tweetsDf = read.csv("rq1TweetsResponses.csv")
#accLabel = {
#  "veteranstoday" : {"politicalOrientation":"left","credible":0},
#  "amlookout" : {"politicalOrientation":"right","credible":0},
#  "opednews" : {"politicalOrientation":"left","credible":0},
#  "InvestWatchBlog" : {"politicalOrientation":"right","credible":0},
#  "MotherJones" : {"politicalOrientation":"left","credible":1},
#  "nypost" : {"politicalOrientation":"right","credible":1},
#  "CNNPolitics" : {"politicalOrientation":"left","credible":1},
#  "Jerusalem_Post" : {"politicalOrientation":"right","credible":1}
  
#}

unique(df$condition_emotionSort)

df$condition_emotionSort <- factor(df$condition_emotionSort, c("happy","mixed","angry"))
df$condition_account <- factor(df$condition_account,c("CNNPolitics","MotherJones","nypost","Jerusalem_Post","opednews","veteranstoday","InvestWatchBlog","amlookout"))
df$condition_credibleLabel_cat <- sapply(df$condition_credibleLabel,function(x){
  if (x==1){ 
    return ("credible")
  } else {
    return ("not credible")
  }
})


summary(df$postq_social)

summary(df$condition_credibleLabel)

df$postq_economic_coded <= as.numeric(df$postq_economic_coded)

df$postq_economic_coded <- revalue(df$postq_economic, c("Very Consertavite"=1,"Slightly Conservative"=0.5,"Moderate"=0,"Slightly liberal"=-0.5,"Very liberal"=-1))
df$postq_social_coded <- revalue(df$postq_social, c("Very Consertavite"=1,"Slightly Conservative"=0.5,"Moderate"=0,"Slightly liberal"=-0.5,"Very liberal"=-1))
df$condition_showImage_cat <- factor(df$condition_showImage_cat, c("without image","with image"))


df$postq_economic_coded <- as.numeric(df$postq_economic_coded)
df$postq_social_coded <- as.numeric(df$postq_social_coded)

df$credibility_choice <- sapply(df$credibility_choice,function(x){
  if (x<=0) {
    return (0.0001)
  } else {
    return (x)
  }
})

df$credibility_uncertainty <- sapply(df$credibility_uncertainty,function(x){
  if (x<=0) {
    return (0.0001)
  } else {
    return (x)
  }
})

df$politicalOrientation_choice <- rescale(df$politicalOrientation_choice, c(0.0001,0.9999))

tweetsDf$condition_credibleLabel_cat <- sapply(tweetsDf$condition_credibleLabel,function(x){
  if (x==1){ 
    return ("credible")
  } else {
    return ("not credible")
  }
})

tweetsDf$condition_emotionSort <- factor(tweetsDf$condition_emotionSort, c("happy","angry"))

tweetsDf$condition_showImage_cat <- factor(tweetsDf$condition_showImage_cat, c("without image","with image"))

tweetsDf$condition_account <- factor(tweetsDf$condition_account, c("CNNPolitics","MotherJones","nypost","Jerusalem_Post","opednews","veteranstoday","InvestWatchBlog","amlookout"))


tweetsDf  <- na.omit(tweetsDf)
tweetsDf <- tweetsDf %>% filter(is.finite(tweetsDf$biasChoice))
tweetsDf <- tweetsDf %>% filter(is.finite(tweetsDf$biasCI))



tweetsDf$biasChoice <- sapply(tweetsDf$biasChoice,function(x){
  if (x<0) {
    return (0.0001)
  } else {
    return (x)
  }
})

tweetsDf$biasCI <- sapply(tweetsDf$biasCI,function(x){
  if (x<=0) {
    return (0.0001)
  } else {
    return (x)
  }
})

summary(df$credibility_uncertainty)

model <- glmmTMB(credibility_choice ~ condition_politicalLabel * condition_emotionSort + condition_showImage_cat + (1|usertoken/condition_account),data=df,
                 family=list(family="beta", link="logit")) 


model1 <- glmmTMB(credibility_uncertainty ~  condition_politicalLabel * condition_emotionSort + condition_showImage  + (1|usertoken/condition_account),data=df,
                 family=list(family="beta", link="logit")) 


plot_model(model, vline.color = "red",show.values = TRUE, value.offset = .3) + ylim(0,4)

plot_model(model1, vline.color = "red",show.values = TRUE, value.offset = .3) 



#model <- glmmTMB(credibility_uncertainty ~  condition_account + condition_showImage + condition_emotionSort +  (1|usertoken) ,data=df)

ggplot(df, aes(x=credibility_choice,color=condition_emotionSort)) + 
  geom_density() 

ggplot(tweetsDf, aes(x=biasChoice,color=condition_emotionSort)) + 
  geom_density() 


m = glmmTMB(biasChoice ~ condition_politicalLabel * condition_emotionSort +  condition_showImage_cat+  (1|usertoken/condition_account), 
             tweetsDf, 
             family=list(family="beta", link="logit"))


m1 = glmmTMB(biasCI ~ condition_politicalLabel * condition_emotionSort +   condition_showImage_cat +  (1|usertoken/condition_account), 
             tweetsDf, 
             family=list(family="beta", link="logit"))


plot_model(m, vline.color = "red",show.values = TRUE, value.offset = .3) + ylim(0.3,2)
plot_model(m1, vline.color = "red",show.values = TRUE, value.offset = .3) + ylim(0.5,1.6)

