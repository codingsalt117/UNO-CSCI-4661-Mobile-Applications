import React, { useReducer } from "react";
import createDataContext from "./createDataContext";

const generateCityGrid = () => {
  const cityGrid = [];
  const enemies= ["Mutants", "Marauders", "Rogue Robots"]
  for (let i = 0; i < 4; i++) {
    const row = [];
    for (let j = 0; j < 4; j++) {
      const danger = Math.floor(Math.random() * 3) + 1;
      const enemy = enemies[Math.floor(Math.random() * enemies.length)];
      row.push({ danger, enemy });
    }
    cityGrid.push(row);
  }
  return cityGrid;
};

const initialState = {
  jobPath: [],
  reward: 0,
};

const cityGridReducer = (state, action) => {
  switch (action.type) {
    case "generate_easy_job":
      return {...state, jobPath: action.payload.jobPath, reward: action.payload.reward};
    case "generate_medium_job":
        //console.log("Medium Reward: ", action.payload.reward);
        //console.log("Medium Jobpath: ", action.payload.jobPath);
        return {...state, jobPath: action.payload.jobPath, reward: action.payload.reward};
    case "generate_hard_job":
        return {...state, jobPath: action.payload.jobPath, reward: action.payload.reward};
    default:
      return state;
  }
};

const generateEasyJob = (dispatch) => () => {
    const cityGrid = generateCityGrid();
    const jobPath = [];
    const reward = 50;

    const getRandomGrid = (row, col) => {
      if (row >= 0 && row < cityGrid.length && col >= 0 && col < cityGrid[0].length) {
        return cityGrid[row][col];
      }
      return null;
    };

    const startRow = Math.floor(Math.random() * 4);
    const startCol = Math.floor(Math.random() * 3);

    const grid1 = getRandomGrid(startRow, startCol);
    const grid2 = getRandomGrid(startRow, startCol + 1);

    if (grid1 && grid2) {
      jobPath.push(grid1);
      jobPath.push(grid2);
      //console.log(jobPath);
      dispatch({ type: "generate_easy_job", payload: {jobPath: jobPath, reward: reward} });
    }
};

const generateMediumJob = (dispatch) => () => {
    const cityGrid = generateCityGrid();
    const jobPath = [];
    const reward = 100;

    const getRandomGrid = (row, col) => {
        if (row >= 0 && row < cityGrid.length && col >= 0 && col < cityGrid[0].length) {
            return cityGrid[row][col];
    }
    return null;
    };

    const startRow = Math.floor(Math.random() * 4);
    const startCol = Math.floor(Math.random() * 2);

    const grid1 = getRandomGrid(startRow, startCol);
    const grid2 = getRandomGrid(startRow, startCol + 1);
    const grid3 = getRandomGrid(startRow, startCol + 2);

    if (grid1 && grid2 && grid3) {
        jobPath.push(grid1);
        jobPath.push(grid2);
        jobPath.push(grid3);
        //console.log(jobPath);
    dispatch({ type: "generate_medium_job", payload: {jobPath: jobPath, reward: reward} });
    }
};

const generateHardJob = (dispatch) => () => {
    const cityGrid = generateCityGrid();
    const jobPath = [];
    const reward = 150;

    const getRandomGrid = (row, col) => {
      const hardRow = (row + cityGrid.length) % cityGrid.length;
      const hardCol = (col + cityGrid[0].length) % cityGrid[0].length;
      return cityGrid[hardRow][hardCol];
    };

    const startRow = Math.floor(Math.random() * 4);
    const startCol = Math.floor(Math.random() * 2);

    const grid1 = getRandomGrid(startRow, startCol);
    const grid2 = getRandomGrid(startRow, startCol + 1);
    const grid3 = getRandomGrid(startRow, startCol + 2);
    const grid4 = getRandomGrid(startRow, startCol + 3);

    if (grid1 && grid2 && grid3) {
        jobPath.push(grid1);
        jobPath.push(grid2);
        jobPath.push(grid3);
        jobPath.push(grid4);
        ///console.log(jobPath);
    dispatch({ type: "generate_hard_job", payload: {jobPath: jobPath, reward: reward} });
    }
};



export const { Context, Provider } = createDataContext(
  cityGridReducer,
  { generateEasyJob, generateMediumJob, generateHardJob },
  initialState
);