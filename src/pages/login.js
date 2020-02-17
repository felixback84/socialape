import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppIcon from '../img/logo192.png';
import { Link } from 'react-router-dom';

// axios
import axios from 'axios';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// styles
const styles = (theme) => ({
    ...theme.notColor
});

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="logo" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField} 
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField> 
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField} 
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField> 
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            disabled={loading}>
                                Login
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress} />
                                )}
                        </Button>
                        <br />
                        <small>
                            dont have an account ? sign up <Link to="/signup">here</Link>
                        </small>
                        
                    </form>
                </Grid>    
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}  

export default withStyles(styles)(login);
