import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Proptypes
import PropTypes from 'prop-types';

// Componets
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux stuff
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

// styles
const styles = (theme) => ({
    ...theme.notColor
});

export class Scream extends Component {

    render() {
        
        dayjs.extend(relativeTime);
        // same: const classes = this.props.classes;

        const { 
            classes, 
            scream: { 
                body, 
                createdAt, 
                userImage, 
                userHandle, 
                screamId, 
                likeCount, 
                commentCount 
            },
            user: {
                authenticated,
                credentials:{ handle }
            } 
        } = this.props;
        
        // logic to the delete button, check if the scream belongs to the current user
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ) : null

        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile image" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                    <ScreamDialog screamId={screamId} userhandle={userHandle}/>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user 
})

export default connect(mapStateToProps)(withStyles(styles)(Scream));
