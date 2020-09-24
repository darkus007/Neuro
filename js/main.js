window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let btnLearning = document.querySelector('button'),
        btnSolve = document.querySelectorAll('button')[1];

    let trainingInput = [[0, 0, 1], 
                        [1, 1, 1],
                        [1, 0, 1], 
                        [0, 1, 1]];
    let trainingOutput = [0, 1, 1, 0];

    function sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    function neurone(data, weight) {
        let output = 0;
        for (let i = 0; i < data.length; i++) {
            output += data[i]*weight[i];
        }
        return sigmoid(output);
    }

    let weight = [];

    btnLearning.addEventListener('click', function() {

        let temp = document.querySelectorAll('input');
        let k = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                trainingInput[i][j] = +temp[k].value;
                k++;
            }
        }
        console.log('trainingInput');
        console.log(trainingInput);
        for (let i = 0; i < 4; i++) {
            trainingOutput[i] = +temp[k].value;
            k++;
        }
        console.log('trainingOutput');
        console.log(trainingOutput);

        for (let i = 0; i < 3; i++) {
            weight[i] = Math.random() * (1 + 1) - 1;
        }
        console.log('Веса до обучения:');
        console.log(weight);

        for (let k = 0; k < 20000; k++) {
            // let outputTemp = trainingInput.map(function(item) {
            //     return [...item];
            // });
    
            let output = [];
            for (let i = 0; i < trainingInput.length; i++) {
                output[i] = neurone(trainingInput[i], weight);
            }
    
            let err = [];
            for (let i = 0; i < trainingOutput.length; i++) {
                err[i] = trainingOutput[i] - output[i];
            }
            
            let adjustments = trainingOutput.map(function() {
                return 0;
            });
            for (let i = 0; i < trainingInput.length; i++) {
                for (let j = 0; j < weight.length; j++) {
                    adjustments[j] = adjustments[j] + trainingInput[i][j] * (err[i] * (output[i] * (1 - output[i])));
                }
            }
            for (let i = 0; i < weight.length; i++) {
                weight[i] += adjustments[i];
            }
        }
    
        console.log("Веса после обучения");
        console.log(weight);
    });


    btnSolve.addEventListener('click', function() {
        let newTask = [];

        let task = document.querySelectorAll('.task');
        for (let i = 0; i < task.length -1; i++) {
            newTask[i] = +task[i].value;
        }
        task[task.length - 1].value = Math.round(neurone(newTask, weight));

        console.log('Новыя задача:');
        console.log(newTask);
        console.log('Ответ:');
        console.log(neurone(newTask, weight));
    });
});