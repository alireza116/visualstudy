library(stm)        # Package for sturctural topic modeling
library(igraph)     # Package for network analysis and visualisation
library(stmCorrViz) # Package for hierarchical correlation view of STMs
library(tidyverse)

data <- read.csv("rq1AccResponses.csv")
data$sourceComment
data <- data %>% filter(sourceComment != "")  

processed <- textProcessor(data$sourceComment, metadata=data,stem=FALSE)
out <- prepDocuments(processed$documents, processed$vocab, processed$meta)

docs <- out$documents
vocab <- out$vocab
meta <- out$meta

poliblogPrevFit <- stm(out$documents, out$vocab, K=20, prevalence=~condition_showImage+condition_emotionSort, 
                       max.em.its=75, data=out$meta, init.type="Spectral", 
                       seed=8458159)
plot(poliblogPrevFit, type="summary", xlim=c(0,.4))

plot(poliblogPrevFit, type="labels", topics=c(3,9))

poliblogSelect <- selectModel(out$documents, out$vocab, K=20, prevalence=~condition_showImage+condition_emotionSort,
                              max.em.its=75, data=meta, runs=20, seed=8458159)
plotModels(poliblogSelect)

topicQuality(model=poliblogPrevFit, documents=docs)

selectedModel3 <- poliblogSelect$runout[[2]] # Choose model #3

plot(selectedModel3, type="summary", xlim=c(0,.4))

labelTopicsSel <- labelTopics(selectedModel3, c(2,4))

labelTopicsSel

thoughts3 <- findThoughts(selectedModel3, texts=data$sourceComment, n=5, topics=1)$docs[[1]]

plotQuote(thoughts3, width=40)
