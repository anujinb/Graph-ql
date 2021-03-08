import React, { useContext } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, Grid, Typography, Button } from '@material-ui/core';
import { AuthContext } from '../context/authContext';
import Navbar from './Navbar';

interface Post {
  id: number;
  title: string;
  description: string;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 100,
    marginLeft: 100,
  },
  fetchButton: { marginTop: 50 },
});

const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

export default function Posts() {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_ALL_POSTS);
  const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS);
  if (loading) return <p>Loading ..</p>;
  if (error) return <p> Error..</p>;

  return (
    <div>
      <Navbar />
      <div className={classes.root}>
        <Grid container direction="row" spacing={3}>
          {data.allPosts.map((p: Post) => (
            <Grid item xs={12} sm={6} md={3} key={p.id}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {p.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {p.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          onClick={() => fetchPosts()}
          variant="contained"
          color="secondary"
          className={classes.fetchButton}
        >
          Fetch
        </Button>
        <div>
          <hr />
          {JSON.stringify(posts)}

          <hr />
        </div>
      </div>
    </div>
  );
}
