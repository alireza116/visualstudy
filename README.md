# Images, emotions, and credibility: effect of emotional facial images on perceptions of news content bias and source credibility in social media.

### This repository includes all of the code for replicating and repeating the analyses for the study.

---

- The folder client, includes the front-end application written in ReactJS
- The folder api includes the backend code that connects to the database. The react app reads the data from this backend.

- The folder public includes the datasets and images used in the study. These include images shown to users and the original images before cleaning.

  - **RQ1** and **RQ2** refer to studies one and two in the paper.
  - **/public/Process.py** is the code that was used to remove certain images that had unclear emotion prediction or ones that were too blurry for the study.
  - The CSVs include the **text**, and the **image** ids for the associated image.

- To start the study application, you need nodejs and npm. First run `npm install` , you can run: `npm run dev`

  - Please note that in order to properly start, you need to provide connection strings to a mongodb database.

- the analysis folder includes R scripts that produce the model results for the study. **RQ1.R** runs the Mixed Effects Beta regressions for study 1, and respectively **RQ2** runs the code for study 2. Within the Topic modeling folder lies the code that runs NMF topic models for analysis of comments.
