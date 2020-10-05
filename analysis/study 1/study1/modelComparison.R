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

modelDf = read.csv("modelComparisonDf.csv")
modelDf$choiceModel <- factor(modelDf$choiceModel, c("first choice","last choice","firstChoiceWeighted","lastChoiceWeighted","mean choice"))
modelDf$condition_emotion <- factor(modelDf$condition_emotion, c("happy","angry","mixed"))


unique(modelDf$choiceModel)

modelt <- glmmTMB(choiceAbsError ~ choiceModel + condition_emotion + (1|usertoken/accName),data=modelDf,
                 family=list(family="beta", link="logit")) 

plot_model(modelt, vline.color = "red",show.values = TRUE, value.offset = .3) + ylim(-1,4)


