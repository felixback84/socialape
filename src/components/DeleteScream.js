import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// components
import MyButton from '../util/MyButton';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

// Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// redux stuff
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';

// styles
const styles = (theme) => ({
    ...theme.notColor,
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
});

class DeleteScream extends Component {
    // state to know the state of box dialog
    state = {
        open: false
    };

    // open dialog box
    handleOpen = () => {
        this.setState({ open: true });
    }

    // close dialog box
    handleClose = () => {
        this.setState({ open: false });
    }

    // action to erase the scream
    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip="Delete Scream" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Are you sure you want to delete this scream?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteScream} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )  
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
};

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream));
