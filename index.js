let equations = document.querySelectorAll(".equation"),
    coefficients = document.querySelectorAll(".coefficient"),
    results = document.querySelectorAll(".result"),
    answers = document.querySelectorAll(".eq-answer"),
    answer = document.querySelector(".answer"),
    error = document.querySelector(".error");

function createSystem() {
    let system = {
        equations: [{
            coefficients: [0, 0, 0],
            result: 0
        },{
            coefficients: [0, 0, 0],
            result: 0
        },{
            coefficients: [0, 0, 0],
            result: 0
        }],
        answer: []
    }
    let i = 0;
    system.equations.forEach((equation, index) => {
        equation.coefficients.forEach((coefficient, coindex) => {
            equation.coefficients[coindex] = +coefficients[i++].value;
        });
        equation.result = +results[index].value;
    });
    return system;
}

coefficients.forEach((coefficient) => {
    coefficient.oninput = main;
});

results.forEach((result) => {
    result.oninput = main;
});

function main() {
    let system = createSystem();
    mainDeterminantBody = [];
    system.equations.forEach((equation) => {
        equation.coefficients.forEach((coefficient) => {
            mainDeterminantBody.push(coefficient);
        });
    });
    mainDeterminant = findDeterminant(mainDeterminantBody);
    console.log(`Main determinant: ${mainDeterminant}`);
    if(mainDeterminant == 0) {
        answer.style.display = "none";
        error.style.display = "block";
        return;
    } else {
        answer.style.display = "flex";
        error.style.display = "none";
    }
    determinants = findDeterminants(system);
    console.log(determinants)
    for(let i = 0; i < 3; i++) {
        system.answer[i] = determinants[i] / mainDeterminant;
    }
    answers.forEach((answer, index) => {
        answer.innerHTML = system.answer[index];
    });
}

function findDeterminant(s) {
    let determinant = 0;
    determinant = (s[0]*s[4]*s[8])+(s[6]*s[1]*s[5])+(s[3]*s[7]*s[2])-(s[6]*s[4]*s[2])-(s[0]*s[7]*s[5])-(s[3]*s[1]*s[8]);
    return determinant;
}

function findDeterminants(system) {
    let determinants = [];
    for(let i = 0; i < 3; i++) {
        let determinantBody = [],
            determinant = 0;
        switch(i) {
            case 0:
                determinantBody = [system.equations[0].result, system.equations[0].coefficients[1], system.equations[0].coefficients[2],
                                   system.equations[1].result, system.equations[1].coefficients[1], system.equations[1].coefficients[2],
                                   system.equations[2].result, system.equations[2].coefficients[1], system.equations[2].coefficients[2]];
                break;
            case 1:
                determinantBody = [system.equations[0].coefficients[0], system.equations[0].result, system.equations[0].coefficients[2],
                                   system.equations[1].coefficients[0], system.equations[1].result, system.equations[1].coefficients[2],
                                   system.equations[2].coefficients[0], system.equations[2].result, system.equations[2].coefficients[2]];
                break;
            case 2:
                determinantBody = [system.equations[0].coefficients[0], system.equations[0].coefficients[1], system.equations[0].result,
                                   system.equations[1].coefficients[0], system.equations[1].coefficients[1], system.equations[1].result,
                                   system.equations[2].coefficients[0], system.equations[2].coefficients[1], system.equations[2].result];
                break;[i]
        }
        determinant = findDeterminant(determinantBody);
        determinants.push(determinant);
    }
    return determinants;
}

main();
