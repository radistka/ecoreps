# ecoreps-backend-challenge
## Ecoreps Backend Challenge (MEAN Stack)

This is a challenge dedicated to backend developers aiming to join our team helping students by providing them a fun and sustainable learning environment. 

## Set up
Make sure you have docker and docker-compose installed.

Docker-compose should be version 1.6 or higher.

### Clone the repo
```bash
$ git clone https://gitlab.com/huckIT/ecorepsBackendChallenge
```
 ### Run docker
 ```bash
 $ docker-compose up
 ```

 App should be running in `localhost:8181`
 
 ## Challenge
 
 This playground is a simplified version of the ecoreps learning platform. Using the MEAN stack, our app includes: 
 - A MongoDB with the Lesson and Student Schema
 - An Express Server with routes needed to manage students and lessons
 - An Angular-Frontend (localhost:8181) 
 
 Currently the app has the following features:
  
  1. Basic creation, view and deletion of students and lessons (Backend and Frontend)
  2. Complete lessons for students (only frontend) 
  3. Show progress for each student including: 
        - number of lessons completed and total lessons
        - percentage of total lessons completed 
        - percentile relative to all students
            General formulae:   rank of the user: y (students with most completed lessons has rank 1, next student has rank 2, and so on)
                                Number of students: n
                                 ->  percentile: x = (n-y)/(n-1)*100 (only frontend)
            -> "You performed better than x% of your classmates"
                                 
                                 
## Requirements

1. Implement the missing backend part for the features  2. and 3. extending the provided express server. 
This will also include to **extend the MongoDD data models**. 
2. Make sure that the data displayed in the Angular App is retrieved from the backend
3. Ensure that the data for all students is always up to date when showing the list. 
Think of a scalable approach that guarantees eventual consistency. 
4. If you decide to **not** do the bonus task, make sure that the data model is prepared for it  


## Bonus-Task

Additionally to the progress for each student, we want to see the last three completed lesson names. Please extend the
app to display the last three ( if available, otherwise less) completed lesson names. This will also include manipulations
on the Angular app. 

## Submission

The solution must be in form of a git repository based on this one and can be hosted on your account
or transferred via E-Mail or any other service in a .git file but including the full .git history.
 