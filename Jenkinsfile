pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKERHUB_USER = 'maadjou04'
        IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t ${DOCKERHUB_USER}/smarttask-backend:${IMAGE_TAG} .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t ${DOCKERHUB_USER}/smarttask-frontend:${IMAGE_TAG} .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push ${DOCKERHUB_USER}/smarttask-backend:${IMAGE_TAG}'
                sh 'docker push ${DOCKERHUB_USER}/smarttask-frontend:${IMAGE_TAG}'
            }
        }
    }

    post {
        success {
            echo 'Pipeline terminé avec succès : images publiées sur Docker Hub.'
        }
        failure {
            echo 'Le pipeline a échoué. Consultez les journaux ci-dessus.'
        }
        always {
            sh 'docker logout'
        }
    }
}
