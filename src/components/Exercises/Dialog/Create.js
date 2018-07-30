import React, { Fragment, Component } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  withStyles
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

const styles = theme => ({
  FormControl: {
    width: 500
  }
});

class Create extends Component {
  state = {
    open: false,
    exercise: {
      title: '',
      description: '',
      muscles: ''
    }
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  /**
   * 인풋 핸들러
   */
  handleChange = name => ({ target: { value } }) => {
    this.setState({
      exercise: {
        ...this.state.exercise,
        [name]: value
      }
    });
  };

  /**
   * 전송 핸들러
   */
  handleSubmit = () => {
    const { exercise } = this.state;
    this.props.onCreate({
      ...exercise,
      id: exercise.title.toLocaleLowerCase().replace(/ /g, '-')
    });

    this.setState({
      open: false,
      exercise: {
        title: '',
        description: '',
        muscles: ''
      }
    });
  };

  render() {
    const {
      open,
      exercise: { title, description, muscles }
    } = this.state;
    const { classes, muscles: categories } = this.props;

    return (
      <Fragment>
        <Button variant="fab" onClick={this.handleToggle} mini>
          <Add />
        </Button>

        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Create a New Exercise
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below.
            </DialogContentText>
            <form>
              <TextField
                label="Title"
                value={title}
                onChange={this.handleChange('title')}
                margin="normal"
                className={classes.FormControl}
              />
              <br />
              <FormControl className={classes.FormControl}>
                <InputLabel htmlFor="muscles">Muscles</InputLabel>
                <Select value={muscles} onChange={this.handleChange('muscles')}>
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <TextField
                className={classes.FormControl}
                multiline
                rows="4"
                label="description"
                value={description}
                onChange={this.handleChange('description')}
                margin="normal"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="raised"
              onClick={this.handleSubmit}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Create);
