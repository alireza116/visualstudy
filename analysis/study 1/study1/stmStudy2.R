library(stm)        # Package for sturctural topic modeling
library(igraph)     # Package for network analysis and visualisation
library(stmCorrViz) # Package for hierarchical correlation view of STMs
library(tidyverse)
library(stmBrowser)
library("stminsights")

data <- read.csv("rq2AccResps.csv")

data <- data %>% filter(sourceComment != "")  


data$familiarity <- data$familiarity_number
data$favorability <- data$favorability_number

processed <- textProcessor(data$sourceComment, metadata=data,stem=FALSE)
out <- prepDocuments(processed$documents, processed$vocab, processed$meta)


docs <- out$documents
vocab <- out$vocab
meta <- out$meta

stmModel2 <- stm(out$documents, out$vocab, K=20, prevalence=~condition + familiarity + favorability + credibility_choice, 
                max.em.its=200, data=out$meta, init.type="Spectral", 
                seed=8458159)

prep2 <- estimateEffect(1:20 ~ condition + familiarity + favorability + credibility_choice, stmModel2, meta = out$meta, uncertainty = "Global")


plot(stmModel2, type="summary", xlim=c(0,.4))

save.image('stmresults.RData')

run_stminsights()
