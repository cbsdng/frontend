import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import {
  errors,
  withStore,
} from 'freenit'

import styles from './styles'


class InstanceList extends React.Component {
  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch = async () => {
    const { instance, notification } = this.props.store
    const response = await instance.fetchAll()
    if (!response.ok) {
      const error = errors(response)
      notification.show(`Error executing fetch: ${error.message}`)
    }
  }

  render() {
    return (
      <Badge
        color="primary"
        badgeContent={this.props.store.instance.list.total}
      >
        <Card style={styles.card}>
          <CardContent>
            <Typography variant="h5" data-id="instances">
              Instances
            </Typography>
            <Typography color="textSecondary">
              All instances
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/instances">
              <Button variant="outlined" size="small">Explore</Button>
            </Link>
          </CardActions>
        </Card>
      </Badge>
    )
  }
}


InstanceList.propTypes = {
  store: PropTypes.shape({
    instance: PropTypes.shape({
      list: PropTypes.shape({
        total: PropTypes.number.isRequired,
      }).isRequired,
      fetchAll: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
}


export default withStore(InstanceList)
