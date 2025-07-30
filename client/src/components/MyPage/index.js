import * as React from 'react';
import { Button, Typography, Grid, Paper } from '@mui/material';
import MyAppbar from '../App/MyAppbar';
import { Box } from '@mui/material';

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
      <Grid
        container
        justifyContent="center"
        spacing={4}
        sx={{
          padding: 4,
          maxWidth: '1000px',
          margin: '0 auto',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 3,
          mt: 4,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
            Movie Match Game
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ color: '#ccc', mt: 1 }}>
            Vote for your favorite out of two randomly matched movies. Your votes influence the leaderboard!
          </Typography>
          <Typography variant="body2" align="center" sx={{ color: '#999', mb: 4 }}>
            Featured Movies: Alien, Amadeus, Anne B. Real, Baby Geniuses, Casablanca, Dial M for Murder, Gigli, Magnolia, Son of the Mask.
          </Typography>
        </Grid>

        {matchup && !voted && (
          <>
            {[matchup.movie1_id, matchup.movie2_id].map((id, i) => {
              const name = i === 0 ? matchup.movie1_name : matchup.movie2_name;
              const poster = i === 0 ? matchup.movie1_poster : matchup.movie2_poster;
              return (
                <Grid item key={id}>
                  <Paper
                    elevation={4}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      p: 2,
                      borderRadius: 2,
                      textAlign: 'center',
                      width: 220,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={poster}
                      alt={name}
                      sx={{
                        width: 200,
                        height: 300,
                        objectFit: 'cover',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    />
                    <Typography sx={{ color: 'white', mb: 1 }}>{name}</Typography>
                    <Button
                      variant="contained"
                      onClick={() => submitVote(id)}
                      sx={{
                        backgroundColor: '#e50914',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: 8,
                        '&:hover': { backgroundColor: '#c21807' },
                      }}
                    >
                      Vote
                    </Button>
                  </Paper>
                </Grid>
              );
            })}
          </>
        )}

        {voted && !sessionComplete && (
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Vote recorded!
            </Typography>
            <Button
              variant="outlined"
              onClick={fetchNextMatchup}
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': { borderColor: '#e50914', color: '#e50914' },
              }}
            >
              Next Matchup
            </Button>
          </Grid>
        )}

        {sessionComplete && (
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              You've voted on all matchups!
            </Typography>
            <Button
              variant="contained"
              onClick={restartSession}
              sx={{
                backgroundColor: '#e50914',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: 8,
                '&:hover': { backgroundColor: '#c21807' },
              }}
            >
              Try Again
            </Button>
          </Grid>
        )}

        {leaderboard.length > 0 && (
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                p: 3,
                borderRadius: 2,
                mt: 4,
              }}
            >
              <Typography
                variant="h5"
                align="center"
                sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}
              >
                🏆 Leaderboard 🏆
              </Typography>
              {leaderboard.map((movie, index) => (
                <Typography
                  key={movie.name}
                  align="center"
                  sx={{ color: 'white', fontSize: '1rem' }}
                >
                  {index + 1}. {movie.name} — {movie.votes} vote{movie.votes !== 1 && 's'}
                </Typography>
              ))}
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
};



export default MyPage;
