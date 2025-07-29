import * as React from 'react';
import { Button, Typography, Grid, Paper } from '@mui/material';
import MyAppbar from '../App/MyAppbar';

const MyPage = () => {
  const [allMatchups, setAllMatchups] = React.useState([]);
  const [seenMatchups, setSeenMatchups] = React.useState(new Set());
  const [matchup, setMatchup] = React.useState(null);
  const [voted, setVoted] = React.useState(false);
  const [leaderboard, setLeaderboard] = React.useState([]);
  const [sessionComplete, setSessionComplete] = React.useState(false);

  const fetchAllMatchups = async () => {
    const res = await fetch('/api/all-matchups');
    const data = await res.json();
    setAllMatchups(data);
  };

  const fetchLeaderboard = async () => {
    const res = await fetch('/api/vote-results');
    const data = await res.json();
    setLeaderboard(data);
  };

  const fetchNextMatchup = () => {
    const remaining = allMatchups.filter(m => !seenMatchups.has(m.matchup_id));
    if (remaining.length === 0) {
      setMatchup(null);
      setSessionComplete(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * remaining.length);
    const next = remaining[randomIndex];
    setMatchup(next);
    setSeenMatchups(prev => new Set(prev).add(next.matchup_id));
    setVoted(false);
  };

  const submitVote = async (winnerId) => {
    await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchup_id: matchup.matchup_id, winner_movie_id: winnerId }),
    });
    setVoted(true);
    fetchLeaderboard();
  };

  const restartSession = () => {
    setSeenMatchups(new Set());
    setSessionComplete(false);
    fetchNextMatchup();
  };

  React.useEffect(() => {
    fetchAllMatchups();
    fetchLeaderboard();
  }, []);

  React.useEffect(() => {
    if (allMatchups.length > 0) {
      fetchNextMatchup();
    }
  }, [allMatchups]);

  return (
    <>
      <MyAppbar />
      <Grid container justifyContent="center" spacing={4} sx={{ padding: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">Movie Match Game</Typography>
        </Grid>

        {matchup && !voted && (
          <>
            <Grid item>
              <Paper elevation={3} sx={{ padding: 2 }}>
                {matchup.movie1_poster && (
                  <img
                    src={matchup.movie1_poster}
                    alt={matchup.movie1_name}
                    style={{ width: '200px', height: 'auto', marginBottom: '10px' }}
                  />
                )}
                <Typography variant="h6">{matchup.movie1_name}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => submitVote(matchup.movie1_id)}
                >
                  Vote
                </Button>
              </Paper>
            </Grid>

            <Grid item>
              <Paper elevation={3} sx={{ padding: 2 }}>
                {matchup.movie2_poster && (
                  <img
                    src={matchup.movie2_poster}
                    alt={matchup.movie2_name}
                    style={{ width: '200px', height: 'auto', marginBottom: '10px' }}
                  />
                )}
                <Typography variant="h6">{matchup.movie2_name}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => submitVote(matchup.movie2_id)}
                >
                  Vote
                </Button>
              </Paper>
            </Grid>
          </>
        )}

        {voted && !sessionComplete && (
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6">Vote recorded!</Typography>
            <Button variant="outlined" onClick={fetchNextMatchup}>
              Next Matchup
            </Button>
          </Grid>
        )}

        {sessionComplete && (
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6">You've voted on all matchups!</Typography>
            <Button variant="contained" onClick={restartSession}>
              🔄 Try Again
            </Button>
          </Grid>
        )}

        {leaderboard.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h5" align="center">🏆 Leaderboard</Typography>
            {leaderboard.map((movie, index) => (
              <Typography key={movie.name} align="center">
                {index + 1}. {movie.name} — {movie.votes} votes
              </Typography>
            ))}
          </Grid>
        )}
      </Grid>
    </>
  );
};



export default MyPage;
