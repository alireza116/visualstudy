library(stm)        # Package for sturctural topic modeling
library(igraph)     # Package for network analysis and visualisation
library(stmCorrViz) # Package for hierarchical correlation view of STMs
library(tidyverse)
library(stmBrowser)
library("stminsights")

data <- read.csv("rq1AccResponses.csv")
data$sourceComment
data <- data %>% filter(sourceComment != "")  


data$condition_emotion <- factor(data$condition_emotionSort,c("mixed","happy","angry"))

processed <- textProcessor(data$sourceComment, metadata=data,stem=FALSE)
out <- prepDocuments(processed$documents, processed$vocab, processed$meta)

docs <- out$documents
vocab <- out$vocab
meta <- out$meta

stmModel <- stm(out$documents, out$vocab, K=20, prevalence=~condition_politicalLabel+condition_emotionSort+condition_showImage+credibility_choice, 
                       max.em.its=200, data=out$meta, init.type="Spectral", 
                       seed=8458159)

# plot(model, type="summary", xlim=c(0,.4))
# thoughts3 <- findThoughts(model, texts=data$sourceComment, n=3, topics=3)$docs[[1]]
# plotQuote(thoughts3, width=40)


prep <- estimateEffect(1:20 ~ condition_politicalLabel+condition_emotionSort+condition_showImage+credibility_choice, stmModel, meta = out$meta, uncertainty = "Global")

# summary(prep, topics = c(9))install.packages("stmgui")

# plot(prep, "credibility_choice", method = "continuous", topics = 9, model = z, printlegend = FALSE, xaxt = "n", xlab = "credibility_choice")

# topics <- 1:20
# 
# levels <- unique(data$condition_showImage_cat)
# levels[1]

save.image('stmresults.RData')
data$sour
run_stminsights()
stmBrowser(mod=model,data=data,covariates=c("condition_emotionSort","condition_showImage","condition_account","credibility_choice"),text="sourceComment")
11