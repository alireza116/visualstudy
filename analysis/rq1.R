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
library(ggplot2)
library(patchwork)
library(cowplot)
library(betareg)



df = read.csv("rq1AccResponses.csv")
tweetsDf = read.csv("rq1TweetsResponses.csv")


df$condition_emotion <- factor(df$condition_emotionSort, c("mixed","happy","angry"))
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


df$condition_showImage_cat <- factor(df$condition_showImage_cat, c("without image","with image"))


df$postq_economic_coded <- as.numeric(df$postq_economic_coded)
df$postq_social_coded <- as.numeric(df$postq_social_coded)

df$credibility_choice <- rescale(df$credibility_choice, c(0.0001,0.9999))

df$credibility_uncertainty <- rescale(df$credibility_uncertainty, c(0.0001,0.9999))

df$politicalOrientation_choice <- rescale(df$politicalOrientation_choice, c(0.0001,0.9999))

df$credibility_distance <- abs(df$credibility_choice - df$condition_credibleLabel)

tweetsDf$condition_credibleLabel_cat <- sapply(tweetsDf$condition_credibleLabel,function(x){
  if (x==1){ 
    return ("credible")
  } else {
    return ("not credible")
  }
})

tweetsDf$condition_emotion <- factor(tweetsDf$condition_emotionSort, c("happy","angry"))

tweetsDf$condition_showImage_cat <- factor(tweetsDf$condition_showImage_cat, c("without image","with image"))

tweetsDf$condition_account <- factor(tweetsDf$condition_account, c("CNNPolitics","MotherJones","nypost","Jerusalem_Post","opednews","veteranstoday","InvestWatchBlog","amlookout"))


tweetsDf  <- na.omit(tweetsDf)
tweetsDf <- tweetsDf %>% filter(is.finite(tweetsDf$biasChoice))
tweetsDf <- tweetsDf %>% filter(is.finite(tweetsDf$biasCI))



tweetsDf$biasChoice <- rescale(tweetsDf$biasChoice, c(0.0001,0.9999))

tweetsDf$biasCI <- rescale(tweetsDf$biasCI, c(0.0001,0.9999))

summary(df$credibility_uncertainty)

a_choice_model <- glmmTMB(credibility_choice ~ condition_politicalLabel * condition_emotion + condition_credibleLabel_cat + condition_showImage_cat  + (1|usertoken/condition_account),data=df,
                 family=list(family="beta", link="logit")) 

a_uncertainty_model <- glmmTMB(credibility_uncertainty ~  condition_politicalLabel * condition_emotion + condition_credibleLabel_cat + condition_showImage_cat + (1|usertoken/condition_account),data=df,
                 family=list(family="beta", link="logit")) 

a_count_tweets_model <- lmer(count_tweets ~ condition_politicalLabel * condition_emotion + condition_credibleLabel_cat + condition_showImage_cat  + (1|usertoken),data=df)

plot_model(a_count_tweets_model, vline.color = "grey",show.values = TRUE, value.offset = .3,show.intercept = TRUE )

p1 <- plot_model(a_choice_model, vline.color = "grey",show.values = TRUE, value.offset = .3,show.intercept = TRUE ) +
theme(axis.text.y = element_text(size = 9), plot.subtitle=element_text(size=11), plot.title = element_text(size = 1))  + ylab("Odds Ratios") +
  labs(subtitle = "Credibility Choice", title = "")  + ylim(0.15,3.5)
#+ ylim(0.2,3.5)

p1

p2 <- plot_model(a_uncertainty_model, vline.color = "grey",show.values = TRUE, value.offset = .3,show.intercept = TRUE) +
  theme(axis.text.y = element_blank(),plot.subtitle=element_text(size=11), plot.title = element_text(size = 1))  + ylab("Odds Ratios") + 
  labs(subtitle = "Credibility Uncertainty", title = "") + ylim(0.2,2.5)

p1 + p2



 #model <- glmmTMB(credibility_uncertainty ~  condition_account + condition_showImage + condition_emotionSort +  (1|usertoken) ,data=df)

ggplot(df, aes(x=credibility_choice,color=condition_emotionSort)) + 
  geom_density() 

ggplot(tweetsDf, aes(x=biasChoice,color=condition_emotionSort)) + 
  geom_density() 


t_choice_model = glmmTMB(biasChoice ~ condition_politicalLabel * condition_emotion + condition_credibleLabel_cat + condition_showImage_cat  +  (1|usertoken/condition_account), 
             tweetsDf, 
             family=list(family="beta", link="logit"))


t_uncertainty_model = glmmTMB(biasCI ~ condition_politicalLabel * condition_emotion + condition_credibleLabel_cat + condition_showImage_cat + (1|usertoken/condition_account), 
             tweetsDf, 
             family=list(family="beta", link="logit"))


p3 <- plot_model(t_choice_model, vline.color = "red",show.values = TRUE, value.offset = .3) +
  theme(axis.text.y = element_text(size = 9), plot.subtitle=element_text(size=11), plot.title = element_text(size = 1)) +
  labs(subtitle = "Bias Choice", title = "")

p4 <- plot_model(t_uncertainty_model, vline.color = "red",show.values = TRUE, value.offset = .3) +
  theme(axis.text.y = element_blank(),plot.subtitle=element_text(size=11), plot.title = element_text(size = 1)) + 
  labs(subtitle = "Bias Uncertainty", title = "") + ylim(0.25,2)

p3 + p4
summary(t_choice_model)
