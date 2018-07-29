import React, { Component, Fragment } from 'react';
import { Footer, Header } from './components/layout';
import Exercises from './components/Exercises';
import { muscles, exercises } from './store';

class App extends Component {
  state = {
    exercises
  };

  getExercisesByMuscles() {
    /**
     *  Object.entries() : [key, value] 형태의 배열을 리턴한다.
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

  render() {
    const exercise = this.getExercisesByMuscles();
    return (
      <Fragment>
        <Header />
        <Exercises exercise={exercise} />
        <Footer muscles={muscles} />
      </Fragment>
    );
  }
}

export default App;
