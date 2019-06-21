import React from 'react'
import Card from '@material-ui/core/Card/Card'
import CardHeader from '@material-ui/core/CardHeader/CardHeader'
import IconButton from '@material-ui/core/IconButton/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CardMedia from '@material-ui/core/CardMedia/CardMedia'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import CardActions from '@material-ui/core/CardActions/CardActions'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import classnames from 'classnames'
import Moment from 'react-moment'
import { red } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse/Collapse'
import Chip from '@material-ui/core/Chip/Chip'
import { Link } from 'react-router-dom'
import T from 'i18n-react'

class ItemTeaser extends React.Component {
  state = { expanded: false, uah: 'UAH' };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  rawMarkup(content){
    return { __html: content };
  }

  render() {
    const { classes, item, currency } = this.props;
    const itemDate = <Moment format={"YYYY/MM/DD"} date={item.updateAt} />

    return (
        <Card className={classes.card}>
          <CardHeader
            // avatar={
            //   item.amount > 0 &&
            //   <Avatar aria-label={item.amount} className={classes.avatar}>
            //     {(item.amount * currency[item.currency.toLowerCase()]).toFixed(2)} {this.state.uah}
            //   </Avatar>
            // }
            action={
              this.props.role === 'admin' ?
              <Link to={"/cabinet/edit/" + item.id} >
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Link> : <div></div>
            }
            title={item.title + (item.identifier ? " / " + item.identifier : '')}
            subheader={itemDate}
          />
          <Link to={"/item/" + item.id} >
            <CardMedia
              className={classes.media}
              image={this.props.item.images ? this.props.item.images[0].url : '/images/no-image.jpg'}
              title="Test"
            />
          </Link>
          <CardContent>
            {item.amount > 0 &&
              <Typography>
                {(item.amount * currency[item.currency.toLowerCase()]).toFixed(2)} {this.state.uah}
              </Typography>
            }
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            {item.amount > 0 &&
              <IconButton
                onClick={() => this.props.onBucketClick(item)}
              >
                <ShoppingCartIcon/>
              </IconButton>
            }
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                <span dangerouslySetInnerHTML={this.rawMarkup(item.description)} />
              </Typography>
              <Typography paragraph>
                {T.translate("item.count")}: {item.count}
              </Typography>
              <div>
                {item.tags && item.tags.map((tag) => {
                  return <Chip label={tag} className={classes.chip} key={tag}/>
                })}
              </div>
            </CardContent>
          </Collapse>
        </Card>
    )
  }
}

const styles = theme => ({
  card: {
    maxWidth: 350,
    margin: 15,
    minHeight: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
    marginRight: -8,
  },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    fontSize: '0.7rem',
    width: 50,
    height: 50
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(ItemTeaser);
