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

accDf <- read.csv("rq2AccResps.csv")
tweetsDf <- read.csv("rq2TweetResps.csv")

accDf$credibility_choice <- rescale(accDf$credibility_choice, c(0.0001,0.9999))
accDf$credibility_uncertainty <- rescale(accDf$credibility_uncertainty, c(0.0001,0.9999))

accDf$familiarity <- accDf$familiarity_number
accDf$favorability <- accDf$favorability_number

accDf$condition <- factor(accDf$condition, c("noImage","happy","angry"))

a_model_choice <- glmmTMB(credibility_choice ~ condition * familiarity +  condition * favorability + (1|usertoken/condition_person),data=accDf,
                 family=list(family="beta", link="logit")) 

a_model_uncertainty <- glmmTMB(credibility_uncertainty ~ condition * familiarity +  condition * favorability + (1|usertoken/condition_person),data=accDf,
                 family=list(family="beta", link="logit")) 

#a_model_count_tweets <- lmer(count_tweets ~ condition * familiarity +  condition * favorability + (1|usertoken),data=accDf) 

plot_model(a_model_choice, vline.color = "red",show.values = TRUE, value.offset = .3) + ylim(0.4,1.5)
plot_model(a_model_uncertainty, vline.color = "red",show.values = TRUE, value.offset = .3) 
#plot_model(a_model_count_tweets, vline.color = "red",show.values = TRUE, value.offset = .3) 


tweetsDf$biasChoice <- rescale(tweetsDf$biasChoice, c(0.0001,0.9999))
tweetsDf$biasCI <- rescale(tweetsDf$biasCI, c(0.0001,0.9999))

tweetsDf$familiarity <- tweetsDf$familiarity_number
tweetsDf$favorability <- tweetsDf$favorability_number

tweetsDf$condition <- factor(tweetsDf$condition, c("noImage","happy","angry"))
tweetsDf$bias_choice <- tweetsDf$biasChoice
tweetsDf$bias_uncertainty <- tweetsDf$biasCI

t_model_choice <- glmmTMB(bias_choice ~ condition * familiarity +  condition * favorability +  (1|usertoken/condition_person),data=tweetsDf,
                 family=list(family="beta", link="logit")) 

t_model_uncertainty <- glmmTMB(bias_uncertainty ~  condition * familiarity +  condition * favorability +  (1|usertoken/condition_person),data=tweetsDf,
                  family=list(family="beta", link="logit")) 

plot_model(t_model_choice, vline.color = "red",show.values = TRUE, value.offset = .3) 

plot_model(t_model_uncertainty, vline.color = "red",show.values = TRUE, value.offset = .3)


