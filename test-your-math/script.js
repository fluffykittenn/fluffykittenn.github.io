let score = 0;

document.addEventListener('DOMContentLoaded', () => {
  generateExercises('multiplication-division', 20, generateMultiplicationOrDivisionQuestion);
  generateExercises('fractions-number-line', 20, generateFractionQuestion);
  generateExercises('measurement-data', 20, generateMeasurementDataQuestion);
  generateExercises('geometry', 20, generateGeometryQuestion);
  generateExercises('word-problems', 20, generateWordProblem);
  generateExercises('time-to-the-minute', 20, generateTimeToTheMinuteQuestion);
  generateExercises('scaled-bar-picture-graphs', 20, generateGraphsQuestion);
  generateExercises('area-perimeter', 20, generateAreaPerimeterQuestion);
  generateExercises('rounding-off', 20, generateRoundingQuestion);
  // Add calls for other topics as needed

});

function generateExercises(containerId, count, questionGenerator) {
  const container = document.getElementById(containerId).querySelector('.exercise-container');
  for (let i = 0; i < count; i++) {
    const exercise = document.createElement('div');
    exercise.classList.add('exercise');

    const question = questionGenerator();
    exercise.innerHTML = `
      <p class="question">${question.text}</p>
      <input type="text" />
      <button>Check Answer</button>
      <div class="feedback"></div>
    `;

exercise.querySelector('button').addEventListener('click', () => {
  const input = exercise.querySelector('input').value;
  const feedback = exercise.querySelector('.feedback');
  if (input == question.answer) {
    feedback.textContent = 'Correct! Great job!';
    feedback.style.color = 'green';
    score++; // Increment the score
    document.getElementById('score').textContent = score; // Update the display
  } else {
    feedback.textContent = 'Oops! Try again.';
    feedback.style.color = 'red';
  }
});

    container.appendChild(exercise);
  }
}

function generateMultiplicationOrDivisionQuestion() {
  const operation = Math.random() > 0.5 ? 'multiplication' : 'division';
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  let text, answer;
  if (operation === 'multiplication') {
    text = `What is ${num1} x ${num2}?`;
    answer = num1 * num2;
  } else {
    text = `What is ${num1 * num2} ÷ ${num1}?`;
    answer = num2;
  }
  return { text, answer };
}

function generateFractionQuestion() {
  // This function will generate simple fraction questions. For the scope of this example,
  // we'll simplify and assume a basic understanding of fractions for demonstration purposes.
  // In a full implementation, this would involve generating fractions and plotting them on a number line,
  // which would require a more complex UI and logic for interaction.
  const num1 = Math.floor(Math.random() * 5) + 1;
  const num2 = num1 + Math.floor(Math.random() * 5) + 1; // Ensure fraction is less than 1
  const text = `What is ${num1}/${num2} in decimal? (Round to 2 decimal places)`;
  const answer = parseFloat((num1 / num2).toFixed(2)); // Round answer to 2 decimal places
  return { text, answer: answer.toString() };
}

function generateMeasurementDataQuestion() {
  // Example: Comparing measurements
  const types = ['length', 'weight', 'volume'];
  const units = {
    length: ['meters', 'centimeters'],
    weight: ['kilograms', 'grams'],
    volume: ['liters', 'milliliters']
  };
  const type = types[Math.floor(Math.random() * types.length)];
  const unit = units[type][Math.floor(Math.random() * units[type].length)];
  const value1 = Math.floor(Math.random() * 100) + 1;
  const value2 = Math.floor(Math.random() * 100) + 50;
  const higherOrLower = Math.random() > 0.5 ? 'greater' : 'less';

  const text = `Which is ${higherOrLower}, ${value1} ${unit} or ${value2} ${unit}?`;
  const answer = higherOrLower === 'greater' ? (value1 > value2 ? `${value1} ${unit}` : `${value2} ${unit}`) : (value1 < value2 ? `${value1} ${unit}` : `${value2} ${unit}`);

  return { text, answer };
}

function generateGeometryQuestion() {
  // Example: Calculate area or perimeter
  const shape = Math.random() > 0.5 ? 'rectangle' : 'square';
  const length = Math.floor(Math.random() * 10) + 5;
  const width = shape === 'rectangle' ? Math.floor(Math.random() * 10) + 5 : length;
  const calculate = Math.random() > 0.5 ? 'area' : 'perimeter';

  const text = `What is the ${calculate} of a ${shape} with ${shape === 'rectangle' ? `length ${length} cm and width ${width} cm?` : `side length ${length} cm?`}`;
  const answer = calculate === 'area' ? (length * width).toString() : (shape === 'rectangle' ? (2 * (length + width)).toString() : (4 * length).toString());

  return { text, answer };
}

function generateWordProblem() {
  const problemTypes = [
    {
      text: "Alex has {num1} apples. He buys {num2} more. How many apples does Alex have now?",
      calculate: (num1, num2) => num1 + num2,
      topic: "addition"
    },
    {
      text: "Sam has {num1} candies. He gives {num2} candies to his friend. How many candies does Sam have left?",
      calculate: (num1, num2) => num1 - num2,
      topic: "subtraction"
    },
    {
      text: "A bakery sells {num1} cupcakes in a pack. How many cupcakes are there in {num2} packs?",
      calculate: (num1, num2) => num1 * num2,
      topic: "multiplication"
    },
    {
      text: "Linda has {num1} pencils. She distributes them equally among {num2} friends. How many pencils does each friend get?",
      calculate: (num1, num2) => num1 / num2,
      topic: "division"
    }
  ];

  const selectedProblem = problemTypes[Math.floor(Math.random() * problemTypes.length)];
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const text = selectedProblem.text.replace('{num1}', num1).replace('{num2}', num2);
  const answer = selectedProblem.calculate(num1, num2).toString();

  return { text, answer };
}

function generateTimeToTheMinuteQuestion() {
  const startHour = Math.floor(Math.random() * 12) + 1;
  const startMinute = Math.floor(Math.random() * 59);
  const addMinutes = Math.floor(Math.random() * 120) + 1; // Add up to 2 hours

  const startTime = new Date(2020, 1, 1, startHour, startMinute);
  const endTime = new Date(startTime.getTime() + addMinutes * 60000);

  const endHour = endTime.getHours() % 12 || 12; // Convert 24h to 12h format and handle midnight
  const endMinute = endTime.getMinutes();
  const text = `If the time is ${startHour}:${startMinute < 10 ? '0' + startMinute : startMinute}, what time will it be in ${addMinutes} minutes?`;
  const answer = `${endHour}:${endMinute < 10 ? '0' + endMinute : endMinute}`;

  return { text, answer };
}

function generateGraphsQuestion() {
  // Example: Asking questions based on a described scenario that would fit a graph
  const questions = [
    {
      text: "A bar graph shows the number of fruits in a basket: 5 apples, 3 bananas, and 7 oranges. Which fruit is there the most of?",
      answer: "oranges"
    },
    {
      text: "A picture graph shows pets in a pet shop: 4 fish icons, 2 cat icons, and 3 dog icons, with each icon representing one pet. How many pets are there in total?",
      answer: "9"
    }
  ];

  const selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
  return { text: selectedQuestion.text, answer: selectedQuestion.answer };
}

function generateAreaPerimeterQuestion() {
  const shapes = [
    {
      shape: "rectangle",
      length: Math.floor(Math.random() * 8) + 3,
      width: Math.floor(Math.random() * 8) + 3
    },
    {
      shape: "square",
      side: Math.floor(Math.random() * 10) + 2
    }
  ];

  const selectedShape = shapes[Math.floor(Math.random() * shapes.length)];
  const calculate = Math.random() > 0.5 ? 'area' : 'perimeter';
  const text = `Calculate the ${calculate} of a ${selectedShape.shape} with ${selectedShape.shape === "rectangle" ? `length ${selectedShape.length} cm and width ${selectedShape.width} cm.` : `a side length of ${selectedShape.side} cm.`}`;
  const answer = calculate === 'area' ? (selectedShape.shape === "rectangle" ? selectedShape.length * selectedShape.width : selectedShape.side * selectedShape.side).toString() : (selectedShape.shape === "rectangle" ? 2 * (selectedShape.length + selectedShape.width) : 4 * selectedShape.side).toString();

  return { text, answer };
}

function generateRoundingQuestion() {
  const number = Math.floor(Math.random() * 1000) + 1;
  const roundTo = [10, 100, 1000][Math.floor(Math.random() * 3)];
  const text = `Round ${number} to the nearest ${roundTo}.`;
  let answer;
  switch (roundTo) {
    case 10:
      answer = Math.round(number / 10) * 10;
      break;
    case 100:
      answer = Math.round(number / 100) * 100;
      break;
    case 1000:
      answer = Math.round(number / 1000) * 1000;
      break;
  }
  return { text, answer: answer.toString() };
}



