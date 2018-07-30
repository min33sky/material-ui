import React, { Component, Fragment } from 'react';
import { Footer, Header } from './components/layout';
import Exercises from './components/Exercises';
import { muscles, exercises } from './store';

class App extends Component {
  state = {
    exercises,
    exercise: {}
  };

  /**
   * store에서 카테고리 및 목록을 가져온다.
   * Return {'카테고리': [내용], ...}
   */
  getExercisesByMuscles() {
    // 카테고리 소속 아이템이 0개라도 카테고리가 사라지지 않기위한 처리
    // 예) { shoulders: [], arms: [] }
    const initExercises = muscles.reduce(
      (exercises, category) => ({
        ...exercises,
        [category]: []
      }),
      {}
    );

    /**
     *  Object.entries() : 객체를 [key, value] 형태의 배열로 리턴한다.
     */
    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;
        exercises[muscles] = [...exercises[muscles], exercise];
        return exercises;
      }, initExercises)
    );
  }

  /**
   * 카테고리 선택
   */
  handleCategorySelect = category => {
    this.setState({
      category
    });
  };

  /**
   * 운동 선택
   */
  handleExerciseSelect = id => {
    // 비동기 처리가 디폴트이기 때문에 이전 상태값을 가져와서 처리하는 방식을 이용
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id)
    }));
  };

  /**
   * 운동 추가
   */
  handleExerciseCreate = exercise => {
    this.setState(({ exercises }) => ({
      exercises: [...exercises, exercise]
    }));
  };

  /**
   * 운동 삭제
   */
  handleExerciseDelete = id => {
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id)
    }));
  };

  render() {
    const exercises = this.getExercisesByMuscles();
    const { category, exercise } = this.state;

    return (
      <Fragment>
        <Header
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />
        <Exercises
          exercises={exercises}
          category={category}
          onSelect={this.handleExerciseSelect}
          exercise={exercise}
          onDelete={this.handleExerciseDelete}
        />
        <Footer
          category={category}
          muscles={muscles}
          onSelect={this.handleCategorySelect}
        />
      </Fragment>
    );
  }
}

export default App;
