import React, { Component, Fragment } from 'react';
import { Footer, Header } from './components/layout';
import Exercises from './components/Exercises';
import { muscles, exercises } from './store';

class App extends Component {
  state = {
    exercises,
    exercise: {}
  };

  getExercisesByMuscles() {
    /**
     *  Object.entries() : 객체를 [key, value] 형태의 배열로 리턴한다.
     */
    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;
        /**
         * 이미 객체 프로퍼티가 값을 가지고 있을 경우엔 true 아니면 false
         * 변수 = undefined일 때 false가 리턴된다.
         */
        exercises[muscles] = exercises[muscles]
          ? [...exercises[muscles], exercise]
          : [exercise];

        return exercises;
      }, {})
    );
  }

  /**
   * 카테고리 선택
   */
  handleCategorySelected = category => {
    this.setState({
      category
    });
  };

  /**
   * 운동 선택
   */
  handleExerciseSelected = id => {
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id)
    }));
  };

  render() {
    const exercises = this.getExercisesByMuscles();
    const { category, exercise } = this.state;
    return (
      <Fragment>
        <Header />
        <Exercises
          exercises={exercises}
          category={category}
          onSelect={this.handleExerciseSelected}
          exercise={exercise}
        />
        <Footer
          category={category}
          muscles={muscles}
          onSelect={this.handleCategorySelected}
        />
      </Fragment>
    );
  }
}

export default App;
