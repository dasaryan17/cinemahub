import React, { useState, useContext, useEffect, useMemo } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { 
  Box, AppBar, Toolbar, TextField, InputAdornment, Container, 
  Stack, Chip, Typography, Card, CardMedia, CardContent, Grid,
  FormControl, Select, MenuItem, IconButton, Pagination, Button 
} from '@mui/material'; 

// Icons Imports
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import SortIcon from '@mui/icons-material/Sort';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Auth Context
import { AuthContext } from '../App';

const initialMovies = [
 { id: 1, title: 'The Shawshank Redemption', rating: 9.3, year: 1994, genre: ['Drama'], duration: 142, description: 'Two imprisoned men bond over a number of years.', poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
  { id: 2, title: 'The Godfather', rating: 9.2, year: 1972, genre: ['Crime', 'Drama'], duration: 175, description: 'The aging patriarch of an organized crime dynasty transfers control to his son.', poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg' },
  { id: 3, title: 'The Dark Knight', rating: 9.0, year: 2008, genre: ['Action', 'Crime', 'Drama'], duration: 152, description: 'Batman must accept one of the greatest psychological tests.', poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDp9QmSbmM9zceOndQb.jpg' },
  { id: 4, title: 'The Godfather Part II', rating: 9.0, year: 1974, genre: ['Crime', 'Drama'], duration: 202, description: 'The early life and career of Vito Corleone in 1920s New York City.', poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg' },
  { id: 5, title: '12 Angry Men', rating: 9.0, year: 1957, genre: ['Crime', 'Drama'], duration: 96, description: 'A jury holdout attempts to prevent a miscarriage of justice.', poster: 'https://image.tmdb.org/t/p/w500/3W0v956XxSG5xgm7LB6qu8ExYJ2.jpg' },
  { id: 6, title: 'Schindler\'s List', rating: 8.9, year: 1993, genre: ['Biography', 'Drama', 'History'], duration: 195, description: 'German industrialist saves Jewish workers from Holocaust.', poster: 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg' },
  { id: 7, title: 'The Lord of the Rings: The Return of the King', rating: 8.9, year: 2003, genre: ['Adventure', 'Drama', 'Fantasy'], duration: 201, description: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army.', poster: 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg' },
  { id: 8, title: 'Pulp Fiction', rating: 8.9, year: 1994, genre: ['Crime', 'Drama'], duration: 154, description: 'The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine.', poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg' },
  { id: 9, title: 'The Good, the Bad and the Ugly', rating: 8.8, year: 1966, genre: ['Adventure', 'Western'], duration: 178, description: 'A bounty hunting scam joins two men in an uneasy alliance.', poster: 'https://image.tmdb.org/t/p/w500/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg' },
  { id: 10, title: 'Fight Club', rating: 8.8, year: 1999, genre: ['Drama'], duration: 139, description: 'An insomniac office worker forms an underground fight club.', poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg' },
  { id: 11, title: 'The Lord of the Rings: The Fellowship of the Ring', rating: 8.8, year: 2001, genre: ['Adventure', 'Drama', 'Fantasy'], duration: 178, description: 'A meek Hobbit begins a perilous quest to destroy a powerful ring.', poster: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg' },
  { id: 12, title: 'Forrest Gump', rating: 8.8, year: 1994, genre: ['Drama', 'Romance'], duration: 142, description: 'The presidencies of Kennedy and Johnson, Vietnam, and other events.', poster: 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg' },
  { id: 13, title: 'Inception', rating: 8.8, year: 2010, genre: ['Action', 'Adventure', 'Sci-Fi'], duration: 148, description: 'A thief who steals corporate secrets through dream-sharing.', poster: 'https://image.tmdb.org/t/p/w500/9gk7Fn9sVAsS969Q9oqQ0qHS9S7.jpg' },
  { id: 14, title: 'The Lord of the Rings: The Two Towers', rating: 8.8, year: 2002, genre: ['Adventure', 'Drama', 'Fantasy'], duration: 179, description: 'Frodo and Sam continue towards Mordor with Gollum as their guide.', poster: 'https://image.tmdb.org/t/p/w500/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg' },
  { id: 15, title: 'Star Wars: Episode V - The Empire Strikes Back', rating: 8.7, year: 1980, genre: ['Action', 'Adventure', 'Fantasy'], duration: 124, description: 'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth.', poster: 'https://image.tmdb.org/t/p/w500/7BuH8itoSrLExs2YZSsM01Qk2no.jpg' },
  { id: 16, title: 'The Matrix', rating: 8.7, year: 1999, genre: ['Action', 'Sci-Fi'], duration: 136, description: 'A computer hacker learns about the true nature of reality.', poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
  { id: 17, title: 'Goodfellas', rating: 8.7, year: 1990, genre: ['Biography', 'Crime', 'Drama'], duration: 146, description: 'The story of Henry Hill and his life in the mob.', poster: 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg' },
  { id: 18, title: 'One Flew Over the Cuckoo\'s Nest', rating: 8.7, year: 1975, genre: ['Drama'], duration: 133, description: 'A criminal pleads insanity and is admitted to a mental institution.', poster: 'https://image.tmdb.org/t/p/w500/3jcbDmRFiQ83drXNOvRDeKHxS0C.jpg' },
  { id: 19, title: 'Seven Samurai', rating: 8.6, year: 1954, genre: ['Action', 'Drama'], duration: 207, description: 'Farmers hire samurai to protect them from bandits.', poster: 'https://image.tmdb.org/t/p/w500/8OKmBV5BUFzmozIC3pPWKHy17kx.jpg' },
  { id: 20, title: 'Se7en', rating: 8.6, year: 1995, genre: ['Crime', 'Drama', 'Mystery'], duration: 127, description: 'Two detectives hunt a serial killer who uses the seven deadly sins.', poster: 'https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg' },
  { id: 21, title: 'It\'s a Wonderful Life', rating: 8.6, year: 1946, genre: ['Drama', 'Family', 'Fantasy'], duration: 130, description: 'An angel is sent from Heaven to help a desperately frustrated businessman.', poster: 'https://image.tmdb.org/t/p/w500/bSqt9rhDZx1Q7UZ86dBPKdNomp2.jpg' },
  { id: 22, title: 'The Silence of the Lambs', rating: 8.6, year: 1991, genre: ['Crime', 'Drama', 'Thriller'], duration: 118, description: 'A young FBI cadet must receive the help of a manipulative cannibal.', poster: 'https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg' },
  { id: 23, title: 'Saving Private Ryan', rating: 8.6, year: 1998, genre: ['Drama', 'War'], duration: 169, description: 'Following D-Day, a group of U.S. soldiers go behind enemy lines.', poster: 'https://image.tmdb.org/t/p/w500/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg' },
  { id: 24, title: 'City of God', rating: 8.6, year: 2002, genre: ['Crime', 'Drama'], duration: 130, description: 'Two boys growing up in a violent neighborhood of Rio de Janeiro.', poster: 'https://image.tmdb.org/t/p/w500/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg' },
  { id: 25, title: 'Interstellar', rating: 8.6, year: 2014, genre: ['Adventure', 'Drama', 'Sci-Fi'], duration: 169, description: 'A team of explorers travel through a wormhole in space.', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlSv7rP.jpg' },
  { id: 26, title: 'Life Is Beautiful', rating: 8.6, year: 1997, genre: ['Comedy', 'Drama', 'Romance'], duration: 116, description: 'A Jewish waiter uses his imagination to shield his son from the horrors of a concentration camp.', poster: 'https://image.tmdb.org/t/p/w500/74hLDKjD5aGYOotO6esUVaeISa2.jpg' },
  { id: 27, title: 'The Green Mile', rating: 8.6, year: 1999, genre: ['Crime', 'Drama', 'Fantasy'], duration: 189, description: 'A supernatural tale set on death row in a Southern prison.', poster: 'https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg' },
  { id: 28, title: 'Star Wars: Episode IV - A New Hope', rating: 8.6, year: 1977, genre: ['Action', 'Adventure', 'Fantasy'], duration: 121, description: 'Luke Skywalker joins forces with a Jedi Knight to free the galaxy.', poster: 'https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg' },
  { id: 29, title: 'Terminator 2: Judgment Day', rating: 8.6, year: 1991, genre: ['Action', 'Sci-Fi'], duration: 137, description: 'A cyborg must protect a young boy from a more advanced cyborg.', poster: 'https://image.tmdb.org/t/p/w500/5M0j0B18abtBI5gi2RhfjjurTqb.jpg' },
  { id: 30, title: 'Back to the Future', rating: 8.5, year: 1985, genre: ['Adventure', 'Comedy', 'Sci-Fi'], duration: 116, description: 'A teenager is accidentally sent 30 years into the past in a time-traveling car.', poster: 'https://image.tmdb.org/t/p/w500/xlBivetfDexiBI7B2HtbXh9w6Ue.jpg' },
  { id: 31, title: 'Spirited Away', rating: 8.6, year: 2001, genre: ['Animation', 'Adventure', 'Family'], duration: 125, description: 'A young girl wanders into a world ruled by gods, witches, and spirits.', poster: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg' },
  { id: 32, title: 'The Pianist', rating: 8.5, year: 2002, genre: ['Biography', 'Drama', 'Music'], duration: 150, description: 'A Polish Jewish musician struggles to survive during WWII.', poster: 'https://image.tmdb.org/t/p/w500/enFfoFd4kZanJNPaQZJoMozFd0C.jpg' },
  { id: 33, title: 'Parasite', rating: 8.6, year: 2019, genre: ['Comedy', 'Drama', 'Thriller'], duration: 132, description: 'Greed and class discrimination threaten the newly formed relationship.', poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' },
  { id: 34, title: 'Psycho', rating: 8.5, year: 1960, genre: ['Horror', 'Mystery', 'Thriller'], duration: 109, description: 'A secretary steals money and encounters a young motel proprietor.', poster: 'https://image.tmdb.org/t/p/w500/Ai6folpmMhZl5MZcY7Sh2PvB4vq.jpg' },
  { id: 35, title: 'Gladiator', rating: 8.5, year: 2000, genre: ['Action', 'Adventure', 'Drama'], duration: 155, description: 'A former Roman General sets out to exact vengeance.', poster: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg' },
  { id: 36, title: 'The Lion King', rating: 8.5, year: 1994, genre: ['Animation', 'Adventure', 'Drama'], duration: 88, description: 'A lion cub and future king searches for his identity.', poster: 'https://image.tmdb.org/t/p/w500/bKPtXn9n4M4G8xp3D3D6Qc6r4Tp.jpg' },
  { id: 37, title: 'Léon: The Professional', rating: 8.5, year: 1994, genre: ['Action', 'Crime', 'Drama'], duration: 110, description: 'A hitman takes in a 12-year-old girl after her family is killed.', poster: 'https://image.tmdb.org/t/p/w500/yI6X2cCM5YPJtxMhUd3dPGqDAhw.jpg' },
  { id: 38, title: 'American History X', rating: 8.5, year: 1998, genre: ['Crime', 'Drama'], duration: 119, description: 'A former neo-nazi skinhead tries to prevent his younger brother from going down the same path.', poster: 'https://image.tmdb.org/t/p/w500/fXepRAYOx1qC3wju7XdDGx60775.jpg' },
  { id: 39, title: 'The Departed', rating: 8.5, year: 2006, genre: ['Crime', 'Drama', 'Thriller'], duration: 151, description: 'An undercover cop and a mole in the police attempt to identify each other.', poster: 'https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq20Qblg61T.jpg' },
  { id: 40, title: 'Whiplash', rating: 8.5, year: 2014, genre: ['Drama', 'Music'], duration: 106, description: 'A promising young drummer enrolls at a cut-throat music conservatory.', poster: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg' },
  { id: 41, title: 'The Prestige', rating: 8.5, year: 2006, genre: ['Drama', 'Mystery', 'Sci-Fi'], duration: 130, description: 'Two stage magicians engage in competitive one-upmanship.', poster: 'https://image.tmdb.org/t/p/w500/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg' },
  { id: 42, title: 'Grave of the Fireflies', rating: 8.5, year: 1988, genre: ['Animation', 'Drama', 'War'], duration: 89, description: 'A young boy and his little sister struggle to survive in Japan during WWII.', poster: 'https://image.tmdb.org/t/p/w500/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg' },
  { id: 43, title: 'Casablanca', rating: 8.5, year: 1942, genre: ['Drama', 'Romance', 'War'], duration: 102, description: 'A cynical expatriate American cafe owner struggles to decide whether to help his former lover.', poster: 'https://image.tmdb.org/t/p/w500/5K7cOHoay2mZusSLezBOY0Qxh8a.jpg' },
  { id: 44, title: 'The Intouchables', rating: 8.5, year: 2011, genre: ['Biography', 'Comedy', 'Drama'], duration: 112, description: 'After he becomes a quadriplegic, an aristocrat hires a young man to be his caregiver.', poster: 'https://image.tmdb.org/t/p/w500/4mFsNQwbD0F237Tx7gAPotd0nbJ.jpg' },
  { id: 45, title: 'Once Upon a Time in the West', rating: 8.5, year: 1968, genre: ['Western'], duration: 165, description: 'A mysterious stranger protects a widow from a ruthless assassin.', poster: 'https://image.tmdb.org/t/p/w500/qbYgqOczabS3pPCCcL5f0EvCyX7.jpg' },
  { id: 46, title: 'Cinema Paradiso', rating: 8.5, year: 1988, genre: ['Drama'], duration: 155, description: 'A filmmaker recalls his childhood and his relationship with the cinema\'s projectionist.', poster: 'https://image.tmdb.org/t/p/w500/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg' },
  { id: 47, title: 'Rear Window', rating: 8.5, year: 1954, genre: ['Mystery', 'Thriller'], duration: 112, description: 'A wheelchair-bound photographer spies on his neighbors and becomes convinced one of them has committed murder.', poster: 'https://image.tmdb.org/t/p/w500/qitnZcLP7C9DLRuPpmvZ7GiEjJN.jpg' },
  { id: 48, title: 'Alien', rating: 8.5, year: 1979, genre: ['Horror', 'Sci-Fi'], duration: 117, description: 'The crew of a commercial spacecraft encounter a deadly lifeform.', poster: 'https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg' },
  { id: 49, title: 'Apocalypse Now', rating: 8.4, year: 1979, genre: ['Drama', 'War'], duration: 147, description: 'A Captain is sent into the depths of a jungle to assassinate a renegade Colonel.', poster: 'https://image.tmdb.org/t/p/w500/gQB8Y5RCMkv2zwzFHbUJX3kAhvA.jpg' },
  { id: 50, title: 'Memento', rating: 8.4, year: 2000, genre: ['Mystery', 'Thriller'], duration: 113, description: 'A man with short-term memory loss attempts to track down his wife\'s murderer.', poster: 'https://image.tmdb.org/t/p/w500/yuNs09hvpHVU1cBTCAk9zxsL2oW.jpg' },
  { id: 51, title: 'Django Unchained', rating: 8.4, year: 2012, genre: ['Drama', 'Western'], duration: 165, description: 'A freed slave teams up with a German bounty hunter to rescue his wife.', poster: 'https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg' },
  { id: 52, title: 'Indiana Jones and the Raiders of the Lost Ark', rating: 8.4, year: 1981, genre: ['Action', 'Adventure'], duration: 115, description: 'Archaeologist Indiana Jones races against Nazis to recover the Ark of the Covenant.', poster: 'https://image.tmdb.org/t/p/w500/ceG9VzoRAVGwivFU403Wc3AHRys.jpg' },
  { id: 53, title: 'WALL·E', rating: 8.4, year: 2008, genre: ['Animation', 'Adventure', 'Family'], duration: 98, description: 'In the distant future, a small waste-collecting robot embarks on a space journey.', poster: 'https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg' },
  { id: 54, title: 'The Lives of Others', rating: 8.4, year: 2006, genre: ['Drama', 'Mystery', 'Thriller'], duration: 137, description: 'In 1984 East Berlin, an agent of the secret police becomes absorbed by the lives of those he surveils.', poster: 'https://image.tmdb.org/t/p/w500/2d1UvjZXP2KdGgM5VFqrkParBq3.jpg' },
  { id: 55, title: 'Sunset Blvd.', rating: 8.4, year: 1950, genre: ['Drama', 'Film-Noir'], duration: 110, description: 'A screenwriter develops a dangerous relationship with a faded film star.', poster: 'https://image.tmdb.org/t/p/w500/zt8dHwBCk2FpV7pycmmLQ40X0Ih.jpg' },
  { id: 56, title: 'Paths of Glory', rating: 8.4, year: 1957, genre: ['Drama', 'War'], duration: 88, description: 'During WWI, Colonel Dax must defend his men against a general\'s charge of cowardice.', poster: 'https://image.tmdb.org/t/p/w500/f8jlCb7nG4WXdFzjPS6kJRaX5BC.jpg' },
  { id: 57, title: 'Avengers: Infinity War', rating: 8.4, year: 2018, genre: ['Action', 'Adventure', 'Sci-Fi'], duration: 149, description: 'The Avengers and their allies must be willing to sacrifice all to stop Thanos.', poster: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg' },
  { id: 58, title: 'Witness for the Prosecution', rating: 8.4, year: 1957, genre: ['Crime', 'Drama', 'Mystery'], duration: 116, description: 'A veteran British barrister must defend his client in a murder trial.', poster: 'https://image.tmdb.org/t/p/w500/3Q0soUQKHnGtfhOrFbvXeN3pI7c.jpg' },
  { id: 59, title: 'Spider-Man: Into the Spider-Verse', rating: 8.4, year: 2018, genre: ['Animation', 'Action', 'Adventure'], duration: 117, description: 'Teen Miles Morales becomes the Spider-Man of his universe.', poster: 'https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg' },
  { id: 60, title: 'Oldboy', rating: 8.4, year: 2003, genre: ['Action', 'Drama', 'Mystery'], duration: 120, description: 'After being kidnapped and imprisoned for fifteen years, a man is released to seek revenge.', poster: 'https://image.tmdb.org/t/p/w500/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg' },
  { id: 61, title: 'Braveheart', rating: 8.3, year: 1995, genre: ['Biography', 'Drama', 'History'], duration: 178, description: 'Scottish warrior William Wallace leads his countrymen in a rebellion.', poster: 'https://image.tmdb.org/t/p/w500/or1gBugydmjToAEq7OZY0owwFk.jpg' },
  { id: 62, title: 'Amadeus', rating: 8.3, year: 1984, genre: ['Biography', 'Drama', 'History'], duration: 160, description: 'The life of Wolfgang Amadeus Mozart as told by his rival, Antonio Salieri.', poster: 'https://image.tmdb.org/t/p/w500/f3j8jMPzDCxKQHvC3t7LIr6VekB.jpg' },
  { id: 63, title: 'The Shining', rating: 8.4, year: 1980, genre: ['Drama', 'Horror'], duration: 146, description: 'A family heads to an isolated hotel where the father becomes influenced by a supernatural presence.', poster: 'https://image.tmdb.org/t/p/w500/xazWoLealqF0pfYgUI2Hkm2cN5h.jpg' },
  { id: 64, title: 'Aliens', rating: 8.4, year: 1986, genre: ['Action', 'Adventure', 'Sci-Fi'], duration: 137, description: 'Fifty-seven years after surviving an apocalyptic attack, Ellen Ripley is sent back to the same planet.', poster: 'https://image.tmdb.org/t/p/w500/nORMXEkYEbzkU5WkMWMgRDJwjSZ.jpg' },
  { id: 65, title: 'Toy Story', rating: 8.3, year: 1995, genre: ['Animation', 'Adventure', 'Comedy'], duration: 81, description: 'A cowboy doll is threatened when a new spaceman action figure supplants him.', poster: 'https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg' },
  { id: 66, title: 'Coco', rating: 8.4, year: 2017, genre: ['Animation', 'Adventure', 'Family'], duration: 105, description: 'Aspiring musician Miguel journeys to the Land of the Dead to find his great-great-grandfather.', poster: 'https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg' },
  { id: 67, title: 'Inglourious Basterds', rating: 8.3, year: 2009, genre: ['Adventure', 'Drama', 'War'], duration: 153, description: 'In Nazi-occupied France, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers.', poster: 'https://image.tmdb.org/t/p/w500/ai0LXkzVM3hMjDhvFdKMUemoBe.jpg' },
  { id: 68, title: 'The Great Dictator', rating: 8.4, year: 1940, genre: ['Comedy', 'Drama', 'War'], duration: 125, description: 'A Jewish barber is mistaken for a tyrannical dictator.', poster: 'https://image.tmdb.org/t/p/w500/1QpO9wo7JWZufY8q2NGiUJ7c8.jpg' },
  { id: 69, title: 'Avengers: Endgame', rating: 8.4, year: 2019, genre: ['Action', 'Adventure', 'Drama'], duration: 181, description: 'The remaining Avengers must find a way to bring back their allies for a final showdown.', poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg' },
  { id: 70, title: 'Princess Mononoke', rating: 8.4, year: 1997, genre: ['Animation', 'Adventure', 'Fantasy'], duration: 134, description: 'On a journey to find the cure for a Tatarigami\'s curse, Ashitaka finds himself in the middle of a war.', poster: 'https://image.tmdb.org/t/p/w500/jHWmNr7M544NNJkX7GiPujh9KcO.jpg' },
  { id: 71, title: 'Once Upon a Time in America', rating: 8.4, year: 1984, genre: ['Crime', 'Drama'], duration: 229, description: 'A former Prohibition-era Jewish gangster returns to Brooklyn over thirty years later.', poster: 'https://image.tmdb.org/t/p/w500/i0enkzsL5dPeneWnjl1fCWm6L7k.jpg' },
  { id: 72, title: 'Good Will Hunting', rating: 8.3, year: 1997, genre: ['Drama', 'Romance'], duration: 126, description: 'Will Hunting, a janitor at M.I.T., has a gift for mathematics.', poster: 'https://image.tmdb.org/t/p/w500/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg' },
  { id: 73, title: 'Your Name', rating: 8.4, year: 2016, genre: ['Animation', 'Drama', 'Fantasy'], duration: 106, description: 'Two strangers find themselves linked in a bizarre way.', poster: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg' },
  { id: 74, title: 'Requiem for a Dream', rating: 8.3, year: 2000, genre: ['Drama'], duration: 102, description: 'The drug-induced utopias of four Coney Island people are shattered.', poster: 'https://image.tmdb.org/t/p/w500/nOd6vjEmzCT0k4VYqsA2hwyi87C.jpg' },
  { id: 75, title: 'Singin\' in the Rain', rating: 8.3, year: 1952, genre: ['Comedy', 'Musical', 'Romance'], duration: 103, description: 'A silent film production company transitions to sound.', poster: 'https://image.tmdb.org/t/p/w500/3KwcM0KjqukRVmUQ18AIkQc1aQZ.jpg' },
  { id: 76, title: 'Toy Story 3', rating: 8.3, year: 2010, genre: ['Animation', 'Adventure', 'Comedy'], duration: 103, description: 'The toys are mistakenly delivered to a daycare center instead of the attic.', poster: 'https://image.tmdb.org/t/p/w500/mMltbSxwEdNE4Cv8QYLpzkHWTDo.jpg' },
  { id: 77, title: '3 Idiots', rating: 8.4, year: 2009, genre: ['Comedy', 'Drama'], duration: 170, description: 'Two friends search for their long lost companion.', poster: 'https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw0zBrxrG.jpg' },
  { id: 78, title: 'High and Low', rating: 8.4, year: 1963, genre: ['Crime', 'Drama', 'Mystery'], duration: 143, description: 'A wealthy businessman\'s son is kidnapped and held for ransom.', poster: 'https://image.tmdb.org/t/p/w500/tgNjemQPG96uIezpiUiXFcer5ga.jpg' },
  { id: 79, title: 'Star Wars: Episode VI - Return of the Jedi', rating: 8.3, year: 1983, genre: ['Action', 'Adventure', 'Fantasy'], duration: 131, description: 'The Rebels dispatch to Endor to destroy the second Death Star.', poster: 'https://image.tmdb.org/t/p/w500/mDCBQNhR6R0PVFucJl0O9hqFnWE.jpg' },
  { id: 80, title: '2001: A Space Odyssey', rating: 8.3, year: 1968, genre: ['Adventure', 'Sci-Fi'], duration: 149, description: 'Humanity finds a mysterious object buried beneath the lunar surface.', poster: 'https://image.tmdb.org/t/p/w500/ve72VxNqjGM69Uky4WTo2bK6rfq.jpg' },
  { id: 81, title: 'Eternal Sunshine of the Spotless Mind', rating: 8.3, year: 2004, genre: ['Drama', 'Romance', 'Sci-Fi'], duration: 108, description: 'A couple undergoes a procedure to erase each other from their memories.', poster: 'https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg' },
  { id: 82, title: 'Reservoir Dogs', rating: 8.3, year: 1992, genre: ['Crime', 'Drama', 'Thriller'], duration: 99, description: 'After a simple jewelry heist goes wrong, the survivors begin to suspect a police informant.', poster: 'https://image.tmdb.org/t/p/w500/AjvSO6cz4yKykBUQYby8fFSg67K.jpg' },
  { id: 83, title: 'Capernaum', rating: 8.4, year: 2018, genre: ['Drama'], duration: 126, description: 'A boy sues his parents for giving him life.', poster: 'https://image.tmdb.org/t/p/w500/9Rj8l6gElLpRL7Kj17iZhrT5Zuw.jpg' },
  { id: 84, title: 'The Hunt', rating: 8.3, year: 2012, genre: ['Drama'], duration: 115, description: 'A teacher lives a lonely life until his life gets turned upside down.', poster: 'https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3NqCxmB0rNymE.jpg' },
  { id: 85, title: 'Lawrence of Arabia', rating: 8.3, year: 1962, genre: ['Adventure', 'Biography', 'Drama'], duration: 218, description: 'The story of T.E. Lawrence and his experiences in Arabia during WWI.', poster: 'https://image.tmdb.org/t/p/w500/rCQm1H3fQLC0JmG7Vz5JPRqVjlx.jpg' },
  { id: 86, title: 'Citizen Kane', rating: 8.3, year: 1941, genre: ['Drama', 'Mystery'], duration: 119, description: 'Following the death of a publishing tycoon, news reporters scramble to discover the meaning of his final utterance.', poster: 'https://image.tmdb.org/t/p/w500/sav0jxhqiH0bPr2vZFU0Kjt2nZL.jpg' },
  { id: 87, title: 'M', rating: 8.3, year: 1931, genre: ['Crime', 'Mystery', 'Thriller'], duration: 99, description: 'When the police are unable to catch a child-murderer, other criminals join in the manhunt.', poster: 'https://image.tmdb.org/t/p/w500/6QZlBH7WkFEVx6rgpUgHRn5axFf.jpg' },
  { id: 88, title: 'North by Northwest', rating: 8.3, year: 1959, genre: ['Action', 'Adventure', 'Mystery'], duration: 136, description: 'A New York advertising executive is mistaken for a government agent.', poster: 'https://image.tmdb.org/t/p/w500/aNV789x0IHWm8Kz8MTkqTBKJmKZ.jpg' },
  { id: 89, title: 'Vertigo', rating: 8.3, year: 1958, genre: ['Mystery', 'Romance', 'Thriller'], duration: 128, description: 'A former police detective becomes obsessed with a woman he is hired to follow.', poster: 'https://image.tmdb.org/t/p/w500/1QY7d2bX1pFo7X9Nxye3gpWsdDO.jpg' },
  { id: 90, title: 'Amélie', rating: 8.3, year: 2001, genre: ['Comedy', 'Romance'], duration: 122, description: 'A shy waitress decides to change the lives of those around her for the better.', poster: 'https://image.tmdb.org/t/p/w500/f0uorE7K7ggH5KawpHigp4m6SXe.jpg' },
  { id: 91, title: 'Double Indemnity', rating: 8.3, year: 1944, genre: ['Crime', 'Drama', 'Film-Noir'], duration: 107, description: 'An insurance representative lets himself be talked into a murder scheme.', poster: 'https://image.tmdb.org/t/p/w500/4Qbqpn29BkK8hYXv9I5zU1qJwqE.jpg' },
  { id: 92, title: 'The Apartment', rating: 8.3, year: 1960, genre: ['Comedy', 'Drama', 'Romance'], duration: 125, description: 'A man tries to rise in his company by letting its executives use his apartment for trysts.', poster: 'https://image.tmdb.org/t/p/w500/5h7Qz8SlV0lqK7qkFhR4tH2lM2G.jpg' },
  { id: 93, title: 'Scarface', rating: 8.3, year: 1983, genre: ['Crime', 'Drama'], duration: 170, description: 'In 1980 Miami, a determined Cuban immigrant takes over a drug cartel.', poster: 'https://image.tmdb.org/t/p/w500/zr2p353wrd6j3yJbqSU1Z3v6K7Z.jpg' },
  { id: 94, title: 'Full Metal Jacket', rating: 8.3, year: 1987, genre: ['Drama', 'War'], duration: 116, description: 'A pragmatic U.S. Marine observes the dehumanizing effects the Vietnam War has on his fellow recruits.', poster: 'https://image.tmdb.org/t/p/w500/kMKyx1k8hWWscYFnPbnxxN4Eqo4.jpg' },
  { id: 95, title: 'Incendies', rating: 8.3, year: 2010, genre: ['Drama', 'Mystery', 'War'], duration: 131, description: 'Twins journey to the Middle East to discover their family history.', poster: 'https://image.tmdb.org/t/p/w500/1K0T8LQnL2mOc2kZ7H2p5zQ5j9n.jpg' },
  { id: 96, title: 'Heat', rating: 8.3, year: 1995, genre: ['Crime', 'Drama', 'Thriller'], duration: 170, description: 'A group of professional bank robbers start to feel the heat from police.', poster: 'https://image.tmdb.org/t/p/w500/rrBuGu0Pjq7Y2BWSI6teGfZzviy.jpg' },
  { id: 97, title: 'A Clockwork Orange', rating: 8.3, year: 1971, genre: ['Crime', 'Drama', 'Sci-Fi'], duration: 136, description: 'In the future, a violent gang leader is subjected to psychological conditioning.', poster: 'https://image.tmdb.org/t/p/w500/4sHeTAp65WrSSuc05nRBKddhBxO.jpg' },
  { id: 98, title: 'Up', rating: 8.3, year: 2009, genre: ['Animation', 'Adventure', 'Comedy'], duration: 96, description: '78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons.', poster: 'https://image.tmdb.org/t/p/w500/vpbaStTMt8qqXaEgnOR2EE4DNJk.jpg' },
  { id: 99, title: 'To Kill a Mockingbird', rating: 8.3, year: 1962, genre: ['Crime', 'Drama'], duration: 129, description: 'Atticus Finch, a lawyer in the Depression-era South, defends a black man against an undeserved rape charge.', poster: 'https://image.tmdb.org/t/p/w500/ymbVkj8q36Kf2V6S9KxEPyBbM6Z.jpg' },
  { id: 100, title: 'The Sting', rating: 8.3, year: 1973, genre: ['Comedy', 'Crime', 'Drama'], duration: 129, description: 'Two grifters team up to pull off the ultimate con.', poster: 'https://image.tmdb.org/t/p/w500/4ABNnmkVpzplrEVQWt1piITT0Ey.jpg' },
  { id: 101, title: 'L.A. Confidential', rating: 8.2, year: 1997, genre: ['Crime', 'Drama', 'Mystery'], duration: 138, description: 'As corruption grows in 1950s LA, three policemen investigate a series of murders.', poster: 'https://image.tmdb.org/t/p/w500/rIXzJCAvyd3Ci8ipylDQ5wUKqwh.jpg' },
  { id: 102, title: 'Taxi Driver', rating: 8.3, year: 1976, genre: ['Crime', 'Drama'], duration: 114, description: 'A mentally unstable veteran works as a nighttime taxi driver in New York City.', poster: 'https://image.tmdb.org/t/p/w500/ekstpH614fwDX8DUln1a2Opz0N8.jpg' },
  { id: 103, title: 'Metropolis', rating: 8.3, year: 1927, genre: ['Drama', 'Sci-Fi'], duration: 153, description: 'In a futuristic city, a son of the city\'s mastermind falls in love with a working-class prophet.', poster: 'https://image.tmdb.org/t/p/w500/qriaeUUwdmlgethK3aSAx68mG05.jpg' },
  { id: 104, title: 'Die Hard', rating: 8.2, year: 1988, genre: ['Action', 'Thriller'], duration: 132, description: 'A New York City police officer tries to save his wife and others taken hostage.', poster: 'https://image.tmdb.org/t/p/w500/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg' },
  { id: 105, title: 'Snatch', rating: 8.3, year: 2000, genre: ['Comedy', 'Crime'], duration: 104, description: 'Unscrupulous boxing promoters, violent bookmakers, and others try to intercept a priceless stolen diamond.', poster: 'https://image.tmdb.org/t/p/w500/56mOJth6DJ6JhgoE2jtpilVqJO.jpg' },
  { id: 106, title: 'Bicycle Thieves', rating: 8.3, year: 1948, genre: ['Drama'], duration: 89, description: 'A man and his son search for a stolen bicycle vital for his job.', poster: 'https://image.tmdb.org/t/p/w500/6Ky5uz6FZqkNZIhFf0LqgqFY2aG.jpg' },
  { id: 107, title: 'Toy Story 4', rating: 7.8, year: 2019, genre: ['Animation', 'Adventure', 'Comedy'], duration: 100, description: 'When a new toy called "Forky" joins Woody and the gang, a road trip leads to unexpected adventures.', poster: 'https://image.tmdb.org/t/p/w500/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg' },
  { id: 108, title: 'Indiana Jones and the Last Crusade', rating: 8.2, year: 1989, genre: ['Action', 'Adventure'], duration: 127, description: 'In 1938, Indiana Jones must find the Holy Grail before the Nazis do.', poster: 'https://image.tmdb.org/t/p/w500/sizg1AU8f8JDZX4QIgE4pjUMBvx.jpg' },
  { id: 109, title: 'Like Stars on Earth', rating: 8.3, year: 2007, genre: ['Drama', 'Family'], duration: 165, description: 'An eight-year-old boy is thought to be lazy until a new art teacher has the patience to discover the real problem.', poster: 'https://image.tmdb.org/t/p/w500/7p1Ol1Jj8HwI7pJvRNkH8wPbYq2.jpg' },
  { id: 110, title: '1917', rating: 8.3, year: 2019, genre: ['Drama', 'War'], duration: 119, description: 'Two soldiers are given an impossible mission: deliver a message deep in enemy territory.', poster: 'https://image.tmdb.org/t/p/w500/AuGiPiGMYMkSosOJ3BQjDEAiwtO.jpg' },
  { id: 111, title: 'Downfall', rating: 8.2, year: 2004, genre: ['Biography', 'Drama', 'History'], duration: 156, description: 'Traudl Junge, the final secretary for Adolf Hitler, tells of the Nazi dictator\'s final days.', poster: 'https://image.tmdb.org/t/p/w500/f5F4cRhQdUbyVbB5lTNCwUzD6BP.jpg' },
  { id: 112, title: 'Dangal', rating: 8.3, year: 2016, genre: ['Action', 'Biography', 'Drama'], duration: 161, description: 'Former wrestler Mahavir Singh Phogat trains his daughters to become world-class wrestlers.', poster: 'https://image.tmdb.org/t/p/w500/6aKBpT6o3hYZoHZ3YEE7kLgvdtB.jpg' },
  { id: 113, title: 'For a Few Dollars More', rating: 8.3, year: 1965, genre: ['Western'], duration: 132, description: 'Two bounty hunters team up to track down an escaped Mexican bandit.', poster: 'https://image.tmdb.org/t/p/w500/6c6o1nGZAxHYLhV8lLjaZQpB8yS.jpg' },
  { id: 114, title: 'The Kid', rating: 8.3, year: 1921, genre: ['Comedy', 'Drama', 'Family'], duration: 68, description: 'The Tramp cares for an abandoned child, but events put their relationship in jeopardy.', poster: 'https://image.tmdb.org/t/p/w500/9bW3c6p6QqSzuCx5gF8k05pB5J2.jpg' },
  { id: 115, title: 'Batman Begins', rating: 8.2, year: 2005, genre: ['Action', 'Adventure', 'Thriller'], duration: 140, description: 'Bruce Wayne trains with a ninja cult to fight crime in Gotham City.', poster: 'https://image.tmdb.org/t/p/w500/8RW2runSEc34IwKN2D1aPcJd2UL.jpg' },
  { id: 116, title: 'Some Like It Hot', rating: 8.2, year: 1959, genre: ['Comedy', 'Music', 'Romance'], duration: 121, description: 'Two musicians witness a mob hit and flee disguised as women in an all-female band.', poster: 'https://image.tmdb.org/t/p/w500/pxc9EFCMYkItESpqqrI783yl8Gh.jpg' },
  { id: 117, title: 'All About Eve', rating: 8.3, year: 1950, genre: ['Drama'], duration: 138, description: 'An ingenue insinuates herself into the lives of an aging Broadway star.', poster: 'https://image.tmdb.org/t/p/w500/6X7ArZ7p8Y4rBr7hKvT6LtJcJtB.jpg' },
  { id: 118, title: 'The Father', rating: 8.3, year: 2020, genre: ['Drama', 'Mystery'], duration: 97, description: 'A man refuses assistance from his daughter as he ages.', poster: 'https://image.tmdb.org/t/p/w500/pr3bEQ517uMb5loLvjFQi8uLAsp.jpg' },
  { id: 119, title: 'Green Book', rating: 8.2, year: 2018, genre: ['Biography', 'Comedy', 'Drama'], duration: 130, description: 'A working-class Italian-American bouncer becomes the driver for an African-American classical pianist.', poster: 'https://image.tmdb.org/t/p/w500/7BsvSuDQuoqhWmU2fL7W2GOcZEN.jpg' },
  { id: 120, title: 'Joker', rating: 8.4, year: 2019, genre: ['Crime', 'Drama', 'Thriller'], duration: 122, description: 'A mentally troubled comedian embarks on a downward spiral of revolution and bloody crime.', poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg' },
  { id: 121, title: 'Ran', rating: 8.2, year: 1985, genre: ['Action', 'Drama', 'War'], duration: 162, description: 'An elderly lord abdicates to his three sons, and the two corrupt ones turn against him.', poster: 'https://image.tmdb.org/t/p/w500/cg6BPxY5z2vVKx1hZQLvL0Qj9i6.jpg' },
  { id: 122, title: 'Casino', rating: 8.2, year: 1995, genre: ['Crime', 'Drama'], duration: 178, description: 'A tale of greed, deception, money, power, and murder in Las Vegas.', poster: 'https://image.tmdb.org/t/p/w500/6zEZY1htzRo2Q4KNqKVCbGk2D3d.jpg' },
  { id: 123, title: 'Unforgiven', rating: 8.2, year: 1992, genre: ['Drama', 'Western'], duration: 130, description: 'Retired Old West gunslinger takes one more job.', poster: 'https://image.tmdb.org/t/p/w500/tbQ6RjJQp8NirevdnK43bjqKqC6.jpg' },
  { id: 124, title: 'A Separation', rating: 8.3, year: 2011, genre: ['Drama', 'Mystery'], duration: 123, description: 'A married couple faces a difficult decision - to improve the life of their child or to stay with an ailing parent.', poster: 'https://image.tmdb.org/t/p/w500/6a6vl5T7Ku8rG0Vq3qKqk7H8tNf.jpg' },
  { id: 125, title: 'The Truman Show', rating: 8.2, year: 1998, genre: ['Comedy', 'Drama'], duration: 103, description: 'An insurance salesman discovers his whole life is a TV show.', poster: 'https://image.tmdb.org/t/p/w500/EelZzudHRvJmjWccWscN1S5vmI.jpg' },
  { id: 126, title: 'Pan\'s Labyrinth', rating: 8.2, year: 2006, genre: ['Drama', 'Fantasy', 'War'], duration: 118, description: 'In the Falangist Spain of 1944, a bookish young stepdaughter escapes into an eerie fantasy world.', poster: 'https://image.tmdb.org/t/p/w500/t0TDsqbCTgSi0AL7k4baZrOYYhi.jpg' },
  { id: 127, title: 'The Sixth Sense', rating: 8.2, year: 1999, genre: ['Drama', 'Mystery', 'Thriller'], duration: 107, description: 'A boy who communicates with spirits seeks the help of a child psychologist.', poster: 'https://image.tmdb.org/t/p/w500/fMMzl8fD0yK0JdTqkSnZgv4Ae3P.jpg' },
  { id: 128, title: 'There Will Be Blood', rating: 8.2, year: 2007, genre: ['Drama'], duration: 158, description: 'A story about family, greed, religion, and oil in early 20th-century America.', poster: 'https://image.tmdb.org/t/p/w500/fa0RkUcnYFfSTaS2v8ZWk8r2P6d.jpg' },
  { id: 129, title: 'Shutter Island', rating: 8.2, year: 2010, genre: ['Mystery', 'Thriller'], duration: 138, description: 'Two U.S. marshals investigate the disappearance of a murderer from a hospital for the criminally insane.', poster: 'https://image.tmdb.org/t/p/w500/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg' },
  { id: 130, title: 'Monty Python and the Holy Grail', rating: 8.2, year: 1975, genre: ['Adventure', 'Comedy', 'Fantasy'], duration: 91, description: 'King Arthur and his knights embark on a low-budget search for the Grail.', poster: 'https://image.tmdb.org/t/p/w500/8AVb7tyxB5wLgK1x0x9g7Fq9O6w.jpg' },
  { id: 131, title: 'Jurassic Park', rating: 8.2, year: 1993, genre: ['Adventure', 'Sci-Fi', 'Thriller'], duration: 127, description: 'A pragmatic paleontologist visits a theme park with cloned dinosaurs.', poster: 'https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg' },
  { id: 132, title: 'Yojimbo', rating: 8.2, year: 1961, genre: ['Action', 'Drama', 'Thriller'], duration: 110, description: 'A crafty ronin comes to a town divided by two criminal gangs.', poster: 'https://image.tmdb.org/t/p/w500/3g7h1q5cF7h5c7q5v5e5T5v5b5.jpg' },
  { id: 133, title: 'The Treasure of the Sierra Madre', rating: 8.2, year: 1948, genre: ['Adventure', 'Drama', 'Western'], duration: 126, description: 'Two Americans searching for work in Mexico convince an old prospector to help them mine for gold.', poster: 'https://image.tmdb.org/t/p/w500/f6Vc6dH7V6b4r2s7kQ5e5x5v5b5.jpg' },
  { id: 134, title: 'Rashomon', rating: 8.2, year: 1950, genre: ['Crime', 'Drama', 'Mystery'], duration: 88, description: 'A heinous crime and its aftermath are recalled from differing points of view.', poster: 'https://image.tmdb.org/t/p/w500/mw7J7fkbY7r0qQf6Z6v5e5x5v5b5.jpg' },
  { id: 135, title: 'The Great Escape', rating: 8.2, year: 1963, genre: ['Adventure', 'Drama', 'History'], duration: 172, description: 'Allied prisoners plan to escape from a German POW camp during WWII.', poster: 'https://image.tmdb.org/t/p/w500/4T4k5p5j5k5p5j5k5p5j5k5p5j5k5.jpg' },
  { id: 136, title: 'Blade Runner', rating: 8.2, year: 1982, genre: ['Action', 'Drama', 'Sci-Fi'], duration: 117, description: 'A blade runner must pursue and terminate four replicants.', poster: 'https://image.tmdb.org/t/p/w500/63N9uy8nd9j7Eog2axPQ8lbr3Wj.jpg' },
  { id: 137, title: 'Chinatown', rating: 8.2, year: 1974, genre: ['Drama', 'Mystery', 'Thriller'], duration: 130, description: 'A private detective hired to expose an adulterer finds himself caught up in a web of deceit.', poster: 'https://image.tmdb.org/t/p/w500/iUfS5XS7Cv5q6bT7pL5f5r5b5f5.jpg' },
  { id: 138, title: 'No Country for Old Men', rating: 8.2, year: 2007, genre: ['Crime', 'Drama', 'Thriller'], duration: 122, description: 'Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong.', poster: 'https://image.tmdb.org/t/p/w500/6d7lN3Q7e3b5n5p5n5p5n5p5n5p5.jpg' },
  { id: 139, title: 'Kill Bill: Vol. 1', rating: 8.2, year: 2003, genre: ['Action', 'Crime', 'Thriller'], duration: 111, description: 'An assassin is shot by her ruthless employer and seeks revenge.', poster: 'https://image.tmdb.org/t/p/w500/v7TaX8kXMXs5yFFGR41guUDNcnB.jpg' },
  { id: 140, title: 'Finding Nemo', rating: 8.2, year: 2003, genre: ['Animation', 'Adventure', 'Comedy'], duration: 100, description: 'A clownfish embarks on a journey to find his son.', poster: 'https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg' },
  { id: 141, title: 'The Elephant Man', rating: 8.2, year: 1980, genre: ['Biography', 'Drama'], duration: 124, description: 'A Victorian surgeon rescues a severely deformed man who is mistreated as a side-show freak.', poster: 'https://image.tmdb.org/t/p/w500/6X7X7X7X7X7X7X7X7X7X7X7X7X7X7.jpg' },
  { id: 142, title: 'V for Vendetta', rating: 8.2, year: 2005, genre: ['Action', 'Drama', 'Sci-Fi'], duration: 132, description: 'In a future British tyranny, a shadowy freedom fighter plots to overthrow it.', poster: 'https://image.tmdb.org/t/p/w500/9WlJF6ZPj8bJ7Z7Z7Z7Z7Z7Z7Z7Z7Z.jpg' },
  { id: 143, title: 'The Wolf of Wall Street', rating: 8.2, year: 2013, genre: ['Biography', 'Comedy', 'Crime'], duration: 180, description: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stockbroker to his fall.', poster: 'https://image.tmdb.org/t/p/w500/7D7pZ5xS5j5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 144, title: 'Gone with the Wind', rating: 8.2, year: 1939, genre: ['Drama', 'History', 'Romance'], duration: 238, description: 'A manipulative woman and a roguish man conduct a turbulent romance.', poster: 'https://image.tmdb.org/t/p/w500/4p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 145, title: 'Lock, Stock and Two Smoking Barrels', rating: 8.2, year: 1998, genre: ['Comedy', 'Crime'], duration: 107, description: 'A botched card game in London triggers four friends to owe money to a gangster.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 146, title: 'Inside Out', rating: 8.2, year: 2015, genre: ['Animation', 'Adventure', 'Comedy'], duration: 95, description: 'After young Riley is uprooted, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how to navigate a new city.', poster: 'https://image.tmdb.org/t/p/w500/lRHE0vzf3oYJrhbsHXjIkF4Tl5A.jpg' },
  { id: 147, title: 'The Secret in Their Eyes', rating: 8.2, year: 2009, genre: ['Drama', 'Mystery', 'Romance'], duration: 129, description: 'A retired legal counselor writes a novel hoping to find closure for a case that still haunts him.', poster: 'https://image.tmdb.org/t/p/w500/9p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 148, title: 'The Thing', rating: 8.2, year: 1982, genre: ['Horror', 'Mystery', 'Sci-Fi'], duration: 109, description: 'A research team in Antarctica is hunted by a shape-shifting alien.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 149, title: 'Raging Bull', rating: 8.2, year: 1980, genre: ['Biography', 'Drama', 'Sport'], duration: 129, description: 'The life of boxer Jake LaMotta, whose violence and temper led him to the top.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 150, title: 'Casino Royale', rating: 8.0, year: 2006, genre: ['Action', 'Adventure', 'Thriller'], duration: 144, description: 'After earning 00 status, James Bond battles a private banker funding terrorists.', poster: 'https://image.tmdb.org/t/p/w500/9p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 151, title: 'A Beautiful Mind', rating: 8.2, year: 2001, genre: ['Biography', 'Drama'], duration: 135, description: 'After John Nash, a brilliant but asocial mathematician, accepts secret work, his life takes a turn.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 152, title: 'Three Billboards Outside Ebbing, Missouri', rating: 8.2, year: 2017, genre: ['Comedy', 'Crime', 'Drama'], duration: 115, description: 'A mother personally challenges the local authorities when they fail to find her daughter\'s killer.', poster: 'https://image.tmdb.org/t/p/w500/vg4Wf5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 153, title: 'Trainspotting', rating: 8.2, year: 1996, genre: ['Drama'], duration: 93, description: 'Renton, deeply immersed in the Edinburgh drug scene, tries to clean up and get out.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 154, title: 'Dial M for Murder', rating: 8.2, year: 1954, genre: ['Crime', 'Mystery', 'Thriller'], duration: 105, description: 'A tennis player arranges the murder of his adulterous wife.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 155, title: 'Gone Girl', rating: 8.1, year: 2014, genre: ['Drama', 'Mystery', 'Thriller'], duration: 149, description: 'With his wife\'s disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 156, title: 'The Deer Hunter', rating: 8.1, year: 1978, genre: ['Drama', 'War'], duration: 183, description: 'An in-depth examination of how the Vietnam War affects a group of friends.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 157, title: 'Fargo', rating: 8.1, year: 1996, genre: ['Crime', 'Drama', 'Thriller'], duration: 98, description: 'Jerry Lundegaard hires two criminals to kidnap his wife for ransom.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 158, title: 'The Third Man', rating: 8.1, year: 1949, genre: ['Film-Noir', 'Mystery', 'Thriller'], duration: 104, description: 'Pulp novelist Holly Martins investigates the death of his friend Harry Lime.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 159, title: 'The Bridge on the River Kwai', rating: 8.1, year: 1957, genre: ['Adventure', 'Drama', 'War'], duration: 161, description: 'British POWs are forced to build a railway bridge for their Japanese captors.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 160, title: 'Gran Torino', rating: 8.1, year: 2008, genre: ['Drama'], duration: 116, description: 'Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 161, title: 'Wild Strawberries', rating: 8.2, year: 1957, genre: ['Drama', 'Romance'], duration: 91, description: 'An old man reflects on his life as he travels to receive an honorary degree.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 162, title: 'Warrior', rating: 8.2, year: 2011, genre: ['Drama', 'Sport'], duration: 140, description: 'The youngest son of an alcoholic former boxer returns home to train under his father.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 163, title: 'My Neighbor Totoro', rating: 8.2, year: 1988, genre: ['Animation', 'Family', 'Fantasy'], duration: 86, description: 'When two girls move to the country, they discover magical creatures in the nearby forest.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 164, title: 'Million Dollar Baby', rating: 8.1, year: 2004, genre: ['Drama', 'Sport'], duration: 132, description: 'A determined woman works with a hardened boxing trainer to become a professional.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 165, title: 'The Big Lebowski', rating: 8.1, year: 1998, genre: ['Comedy', 'Crime'], duration: 117, description: 'Jeff "The Dude" Lebowski is mistaken for a millionaire of the same name.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 166, title: 'Harry Potter and the Deathly Hallows: Part 2', rating: 8.1, year: 2011, genre: ['Adventure', 'Drama', 'Fantasy'], duration: 130, description: 'Harry, Ron and Hermione search for Voldemort\'s remaining Horcruxes.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 167, title: 'Howl\'s Moving Castle', rating: 8.2, year: 2004, genre: ['Animation', 'Adventure', 'Family'], duration: 119, description: 'When an unconfident young woman is cursed with an old body, she seeks help from a wizard.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 168, title: 'The Gold Rush', rating: 8.2, year: 1925, genre: ['Adventure', 'Comedy', 'Drama'], duration: 95, description: 'A prospector goes to the Klondike in search of gold and finds love and adventure.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 169, title: 'Vicky Cristina Barcelona', rating: 7.1, year: 2008, genre: ['Drama', 'Romance'], duration: 96, description: 'Two friends on a summer holiday in Spain become enamored with the same painter.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 170, title: 'The Grand Budapest Hotel', rating: 8.1, year: 2014, genre: ['Adventure', 'Comedy', 'Drama'], duration: 99, description: 'A writer encounters the owner of an aging hotel who tells him of his early years.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 171, title: 'Sherlock Jr.', rating: 8.2, year: 1924, genre: ['Action', 'Comedy', 'Romance'], duration: 45, description: 'A film projectionist longs to be a detective, and puts his meagre skills to work.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 172, title: 'Prisoners', rating: 8.1, year: 2013, genre: ['Crime', 'Drama', 'Mystery'], duration: 153, description: 'When two girls disappear, a desperate father takes matters into his own hands.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 173, title: 'Hacksaw Ridge', rating: 8.1, year: 2016, genre: ['Biography', 'Drama', 'History'], duration: 139, description: 'World War II American Army Medic Desmond T. Doss, who refused to kill people.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 174, title: 'Mr. Smith Goes to Washington', rating: 8.1, year: 1939, genre: ['Comedy', 'Drama'], duration: 129, description: 'A naive man is appointed to fill a vacancy in the United States Senate.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 175, title: 'Room', rating: 8.1, year: 2015, genre: ['Drama', 'Thriller'], duration: 118, description: 'A young boy is held captive in a small room with his mother.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 176, title: 'Network', rating: 8.1, year: 1976, genre: ['Drama'], duration: 121, description: 'A TV network cynically exploits a deranged former anchor\'s ravings and revelations about the media.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 177, title: 'Logan', rating: 8.1, year: 2017, genre: ['Action', 'Drama', 'Sci-Fi'], duration: 137, description: 'In a future where mutants are nearly extinct, an elderly and weary Logan cares for an ailing Professor X.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 178, title: 'Stand by Me', rating: 8.1, year: 1986, genre: ['Adventure', 'Drama'], duration: 89, description: 'After the death of a friend, a writer recounts a boyhood journey with his friends.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 179, title: 'Platoon', rating: 8.1, year: 1986, genre: ['Drama', 'War'], duration: 120, description: 'A young soldier in Vietnam faces a moral crisis when confronted with the horrors of war.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 180, title: 'The 400 Blows', rating: 8.1, year: 1959, genre: ['Crime', 'Drama'], duration: 99, description: 'A young boy in Paris turns to a life of crime.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 181, title: 'The Help', rating: 8.1, year: 2011, genre: ['Drama'], duration: 146, description: 'An aspiring author during the civil rights movement writes a book detailing the African American maids\' point of view.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 182, title: 'Rush', rating: 8.1, year: 2013, genre: ['Action', 'Biography', 'Drama'], duration: 123, description: 'The rivalry between Formula 1 drivers James Hunt and Niki Lauda.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 183, title: 'In the Name of the Father', rating: 8.1, year: 1993, genre: ['Biography', 'Drama'], duration: 133, description: 'A man\'s coerced confession to an IRA bombing he did not commit leads to his imprisonment.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 184, title: 'The Princess Bride', rating: 8.1, year: 1987, genre: ['Adventure', 'Family', 'Fantasy'], duration: 98, description: 'A bedridden boy\'s grandfather reads him the story of a farmboy-turned-pirate.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 185, title: 'Before Sunrise', rating: 8.1, year: 1995, genre: ['Drama', 'Romance'], duration: 101, description: 'A young man and woman meet on a train in Europe and spend one evening together in Vienna.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 186, title: 'The Terminator', rating: 8.1, year: 1984, genre: ['Action', 'Sci-Fi'], duration: 107, description: 'A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 187, title: 'Mad Max: Fury Road', rating: 8.1, year: 2015, genre: ['Action', 'Adventure', 'Sci-Fi'], duration: 120, description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 188, title: 'The Exorcist', rating: 8.1, year: 1973, genre: ['Horror'], duration: 122, description: 'When a 12-year-old girl is possessed by a mysterious entity, her mother seeks the help of two priests.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 189, title: 'To Be or Not to Be', rating: 8.1, year: 1942, genre: ['Comedy', 'Romance', 'War'], duration: 99, description: 'During the Nazi occupation of Poland, an acting troupe becomes embroiled in a Polish soldier\'s efforts to track down a German spy.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 190, title: 'Relatos salvajes', rating: 8.1, year: 2014, genre: ['Comedy', 'Drama', 'Thriller'], duration: 122, description: 'Six short stories that explore the extremities of human behavior.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 191, title: 'Gandhi', rating: 8.1, year: 1982, genre: ['Biography', 'Drama', 'History'], duration: 191, description: 'The life of the lawyer who became the famed leader of the Indian revolts against the British.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 192, title: 'The Best Years of Our Lives', rating: 8.1, year: 1946, genre: ['Drama', 'Romance', 'War'], duration: 170, description: 'Three WWII veterans return home to small-town America to discover that they have changed.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 193, title: 'Mary and Max', rating: 8.1, year: 2009, genre: ['Animation', 'Comedy', 'Drama'], duration: 92, description: 'A tale of friendship between two unlikely pen pals: Mary, a lonely Australian girl, and Max, an obese man living in New York.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 194, title: 'Spotlight', rating: 8.1, year: 2015, genre: ['Crime', 'Drama', 'History'], duration: 128, description: 'The true story of how the Boston Globe uncovered the massive scandal of child molestation within the local Catholic Archdiocese.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 195, title: 'Jurassic World', rating: 6.9, year: 2015, genre: ['Action', 'Adventure', 'Sci-Fi'], duration: 124, description: 'A new theme park is built on the original site of Jurassic Park.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 196, title: 'Monsters, Inc.', rating: 8.1, year: 2001, genre: ['Animation', 'Adventure', 'Comedy'], duration: 92, description: 'Monsters generate their city\'s power by scaring children, but they are terrified that children are toxic.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 197, title: 'The Wizard of Oz', rating: 8.1, year: 1939, genre: ['Adventure', 'Family', 'Fantasy'], duration: 102, description: 'Dorothy Gale is swept away to a magical land and embarks on a quest to see the Wizard.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 198, title: 'Into the Wild', rating: 8.1, year: 2007, genre: ['Adventure', 'Biography', 'Drama'], duration: 148, description: 'After graduating from Emory University, Christopher McCandless abandons his possessions and hitchhikes to Alaska.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 199, title: 'The Sound of Music', rating: 8.1, year: 1965, genre: ['Biography', 'Drama', 'Family'], duration: 172, description: 'A woman leaves an Austrian convent to become a governess to the children of a Naval officer widower.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 200, title: 'Butch Cassidy and the Sundance Kid', rating: 8.1, year: 1969, genre: ['Biography', 'Crime', 'Drama'], duration: 110, description: 'Two Western bank/train robbers flee to Bolivia when the law gets too close.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 201, title: 'Before Sunset', rating: 8.1, year: 2004, genre: ['Drama', 'Romance'], duration: 80, description: 'Nine years after their first meeting, Jesse and Celine reunite in Paris.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 202, title: '12 Years a Slave', rating: 8.1, year: 2013, genre: ['Biography', 'Drama', 'History'], duration: 134, description: 'In the antebellum United States, Solomon Northup, a free black man, is abducted and sold into slavery.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 203, title: 'The Wages of Fear', rating: 8.1, year: 1953, genre: ['Adventure', 'Drama', 'Thriller'], duration: 131, description: 'In a South American village, four men are hired to transport nitroglycerine.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 204, title: 'Harry Potter and the Prisoner of Azkaban', rating: 8.0, year: 2004, genre: ['Adventure', 'Family', 'Fantasy'], duration: 142, description: 'Harry Potter must confront Sirius Black, an escaped prisoner.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 205, title: 'Hachi: A Dog\'s Tale', rating: 8.1, year: 2009, genre: ['Biography', 'Drama', 'Family'], duration: 93, description: 'A college professor\'s bond with the abandoned dog he takes into his home.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 206, title: 'Groundhog Day', rating: 8.0, year: 1993, genre: ['Comedy', 'Drama', 'Fantasy'], duration: 101, description: 'A weatherman finds himself inexplicably living the same day over and over again.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 207, title: 'La La Land', rating: 8.0, year: 2016, genre: ['Comedy', 'Drama', 'Music'], duration: 128, description: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 208, title: 'Barry Lyndon', rating: 8.1, year: 1975, genre: ['Adventure', 'Drama', 'History'], duration: 185, description: 'An Irish rogue wins the heart of a rich widow and assumes her dead husband\'s position.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 209, title: 'Amores perros', rating: 8.1, year: 2000, genre: ['Drama', 'Thriller'], duration: 154, description: 'A horrific car accident connects three stories, each involving characters dealing with loss.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 210, title: 'The General', rating: 8.1, year: 1926, genre: ['Action', 'Adventure', 'Comedy'], duration: 67, description: 'When Union spies steal an engineer\'s beloved locomotive, he pursues it single-handedly.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 211, title: 'Persona', rating: 8.1, year: 1966, genre: ['Drama', 'Thriller'], duration: 85, description: 'A nurse is put in charge of an actress who can\'t talk and finds that their personalities are melding together.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 212, title: 'Pirates of the Caribbean: The Curse of the Black Pearl', rating: 8.0, year: 2003, genre: ['Action', 'Adventure', 'Fantasy'], duration: 143, description: 'Blacksmith Will Turner teams up with pirate Jack Sparrow to save his love.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 213, title: 'The Seventh Seal', rating: 8.1, year: 1957, genre: ['Drama', 'Fantasy', 'History'], duration: 96, description: 'A knight seeks answers about life, death, and the existence of God as he plays chess.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 214, title: 'Mandariinid', rating: 8.2, year: 2013, genre: ['Drama', 'War'], duration: 87, description: 'In 1992, during the war in Abkhazia, an Estonian man stays behind to harvest his crops.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 215, title: 'Sholay', rating: 8.2, year: 1975, genre: ['Action', 'Adventure', 'Comedy'], duration: 204, description: 'After his family is murdered, a police officer enlists two criminals to capture the killer.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 216, title: 'Klaus', rating: 8.2, year: 2019, genre: ['Animation', 'Adventure', 'Comedy'], duration: 96, description: 'A postman stationed in a remote town befriends a reclusive toymaker.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 217, title: 'In the Mood for Love', rating: 8.1, year: 2000, genre: ['Drama', 'Romance'], duration: 98, description: 'Two neighbors form a strong bond after suspecting their spouses of having an affair.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 218, title: 'The Nights of Cabiria', rating: 8.1, year: 1957, genre: ['Drama'], duration: 110, description: 'A waifish prostitute wanders the streets of Rome looking for true love.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 219, title: 'Hotel Rwanda', rating: 8.1, year: 2004, genre: ['Biography', 'Drama', 'History'], duration: 121, description: 'Paul Rusesabagina, a hotel manager, houses over a thousand Tutsi refugees during their struggle.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 220, title: 'All Quiet on the Western Front', rating: 8.1, year: 1930, genre: ['Drama', 'War'], duration: 152, description: 'German youths eagerly enter World War I, but their enthusiasm wanes as they experience the horror.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 221, title: 'Roman Holiday', rating: 8.1, year: 1953, genre: ['Comedy', 'Drama', 'Romance'], duration: 118, description: 'A bored princess escapes her guardians and falls in love with an American newsman.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 222, title: 'Logan Lucky', rating: 7.0, year: 2017, genre: ['Action', 'Comedy', 'Crime'], duration: 119, description: 'Two brothers attempt to pull off a heist during a NASCAR race.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 223, title: 'Andhadhun', rating: 8.2, year: 2018, genre: ['Crime', 'Thriller'], duration: 139, description: 'A series of mysterious events change the life of a blind pianist.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 224, title: 'Rebecca', rating: 8.1, year: 1940, genre: ['Drama', 'Mystery', 'Romance'], duration: 130, description: 'A self-conscious bride is tormented by the memory of her husband\'s first wife.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 225, title: 'Come and See', rating: 8.3, year: 1985, genre: ['Drama', 'War'], duration: 142, description: 'After finding an old rifle, a young boy joins the Soviet resistance movement against the German forces.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 226, title: 'Rang De Basanti', rating: 8.2, year: 2006, genre: ['Comedy', 'Drama'], duration: 157, description: 'The story of six young Indians who assist an English filmmaker.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 227, title: 'The Incredibles', rating: 8.0, year: 2004, genre: ['Animation', 'Action', 'Adventure'], duration: 115, description: 'A family of undercover superheroes attempt to live a quiet suburban life.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 228, title: 'Anatomy of a Murder', rating: 8.0, year: 1959, genre: ['Crime', 'Drama', 'Mystery'], duration: 161, description: 'A lawyer defends a man who claims he suffered from temporary insanity after murdering a man.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 229, title: 'Memories of Murder', rating: 8.1, year: 2003, genre: ['Crime', 'Drama', 'Mystery'], duration: 132, description: 'In a small Korean province in 1986, two detectives struggle with the case of multiple young women being murdered.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 230, title: 'The Iron Giant', rating: 8.1, year: 1999, genre: ['Animation', 'Action', 'Adventure'], duration: 86, description: 'A young boy befriends a giant robot from outer space that a paranoid government agent wants to destroy.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 231, title: 'The Battle of Algiers', rating: 8.1, year: 1966, genre: ['Drama', 'War'], duration: 121, description: 'In the 1950s, fear and violence escalate as the people of Algiers fight for independence.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 232, title: 'What Ever Happened to Baby Jane?', rating: 8.1, year: 1962, genre: ['Drama', 'Horror', 'Thriller'], duration: 134, description: 'A former child star torments her paraplegic sister in their decaying Hollywood mansion.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 233, title: 'The Red Shoes', rating: 8.1, year: 1948, genre: ['Drama', 'Music', 'Romance'], duration: 133, description: 'A young ballet dancer is torn between love and her art.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 234, title: 'La Haine', rating: 8.1, year: 1995, genre: ['Crime', 'Drama'], duration: 98, description: '24 hours in the lives of three young men in the French suburbs the day after a violent riot.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 235, title: 'Stalker', rating: 8.1, year: 1979, genre: ['Drama', 'Sci-Fi'], duration: 162, description: 'A guide leads two men through an area known as the Zone to find a room that grants wishes.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 236, title: 'Jai Bhim', rating: 8.9, year: 2021, genre: ['Crime', 'Drama', 'Mystery'], duration: 164, description: 'A lawyer fights for justice when a tribal man is arrested for a case he did not commit.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 237, title: 'Finding Neverland', rating: 7.7, year: 2004, genre: ['Biography', 'Drama', 'Family'], duration: 106, description: 'The story of J.M. Barrie\'s friendship with a family that inspired him to create Peter Pan.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 238, title: 'Gangs of Wasseypur', rating: 8.2, year: 2012, genre: ['Action', 'Crime', 'Drama'], duration: 321, description: 'A clash between Sultan and Shahid Khan leads to the expulsion of Khan from Wasseypur.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 239, title: 'Rocky', rating: 8.1, year: 1976, genre: ['Drama', 'Sport'], duration: 120, description: 'A small-time boxer gets a chance to fight the heavyweight champion.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 240, title: 'Pather Panchali', rating: 8.4, year: 1955, genre: ['Drama'], duration: 125, description: 'Impoverished priest Harihar Ray dreams of a better life for his family.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 241, title: 'Lagaan: Once Upon a Time in India', rating: 8.1, year: 2001, genre: ['Adventure', 'Drama', 'Musical'], duration: 224, description: 'The people of a small village in Victorian India stake their future on a game of cricket.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 242, title: 'Harry Potter and the Goblet of Fire', rating: 7.7, year: 2005, genre: ['Adventure', 'Family', 'Fantasy'], duration: 157, description: 'Harry Potter finds himself competing in a hazardous tournament between rival schools.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 243, title: 'The Grapes of Wrath', rating: 8.1, year: 1940, genre: ['Drama', 'History'], duration: 129, description: 'An Oklahoma family, driven off their farm, travels to California for a better life.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 244, title: 'Brief Encounter', rating: 8.1, year: 1945, genre: ['Drama', 'Romance'], duration: 86, description: 'Meeting a stranger in a railway station, a woman is tempted to cheat on her husband.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 245, title: 'Monsters, Inc.', rating: 8.1, year: 2001, genre: ['Animation', 'Adventure', 'Comedy'], duration: 92, description: 'Monsters generate their city\'s power by scaring children, but they are terrified that children are toxic.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 246, title: 'Wild Tales', rating: 8.1, year: 2014, genre: ['Comedy', 'Drama', 'Thriller'], duration: 122, description: 'Six short stories that explore the extremities of human behavior.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 247, title: 'The Big Sick', rating: 7.6, year: 2017, genre: ['Comedy', 'Drama', 'Romance'], duration: 120, description: 'Pakistan-born comedian Kumail and grad student Emily fall in love, but their cultures clash.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 248, title: 'PK', rating: 8.1, year: 2014, genre: ['Comedy', 'Drama', 'Fantasy'], duration: 153, description: 'An alien on Earth loses the only device he can use to communicate with his spaceship.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 249, title: 'Ratatouille', rating: 8.1, year: 2007, genre: ['Animation', 'Adventure', 'Comedy'], duration: 111, description: 'A rat who can cook makes an unusual alliance with a young kitchen worker.', poster: 'https://image.tmdb.org/t/p/w500/8p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
  { id: 250, title: 'Dilwale Dulhania Le Jayenge', rating: 8.2, year: 1995, genre: ['Drama', 'Romance'], duration: 189, description: 'When Raj meets Simran in Europe, it isn\'t love at first sight but they grow to like each other.', poster: 'https://image.tmdb.org/t/p/w500/7p5p5p5p5p5p5p5p5p5p5p5p5p5p5.jpg' },
];

function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 

  // 1. Updated Local Storage Logic: Yeh 250 movies ko force-load karega
  const [allMovies, setAllMovies] = useState(() => {
    const saved = localStorage.getItem('cinema_movies');
    const parsedSaved = saved ? JSON.parse(saved) : [];

    // FIX: Agar saved movies 250 se kam hain, toh naya data load karo
    if (parsedSaved.length < 200) { 
      localStorage.setItem('cinema_movies', JSON.stringify(initialMovies));
      return initialMovies; 
    }
    return parsedSaved;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [page, setPage] = useState(1);

  const MOVIES_PER_PAGE = 50; 
  const isAdmin = user && user.role === 'admin'; 
  const genres = ["All", "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Drama", "Family", "Fantasy", "History", "Sci-Fi", "Thriller"];

  // 2. Sync changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('cinema_movies', JSON.stringify(allMovies));
  }, [allMovies]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      const updatedMovies = allMovies.filter(m => m.id !== id);
      setAllMovies(updatedMovies);
    }
  };

  // 3. Filter & Sort Logic (Optimized with useMemo)
  const filteredMovies = useMemo(() => {
    return allMovies
      .filter(m => 
        (selectedGenre === "All" || (m.genre && m.genre.includes(selectedGenre))) &&
        (
          m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          (m.description && m.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      )
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "year") return b.year - a.year; 
        if (sortBy === "duration") return b.duration - a.duration; 
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [allMovies, searchTerm, selectedGenre, sortBy]);

  // 4. Pagination Logic
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
  const paginatedMovies = filteredMovies.slice(
    (page - 1) * MOVIES_PER_PAGE,
    page * MOVIES_PER_PAGE
  );

  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', pb: 6 }}>
      
      {/* Navbar */}
      <AppBar position="sticky" sx={{ bgcolor: '#1A1A1A', borderBottom: '2px solid #F5C518', zIndex: 1100, backgroundImage: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
          

          <TextField
              placeholder="Search 250+ movies..."
              size="small"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              sx={{ 
                  bgcolor: '#2C2C2C', borderRadius: 1, width: { xs: '100%', md: '500px' }, 
                  '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { border: 'none' } }
              }}
              InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#F5C518' }} />
                    </InputAdornment>
                  ),
              }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}> 
              {isAdmin && (
                  <Button
                      variant="contained"
                      onClick={() => navigate('/admin/add-movie')}
                      startIcon={<AddIcon />}
                      sx={{ bgcolor: '#f5c518', color: 'black', fontWeight: 'bold', '&:hover': { bgcolor: '#e2b616' } }}
                  >
                      Add Movie
                  </Button>
              )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        
        {/* Genre Chips & Sort */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {genres.map(g => (
              <Chip 
                key={g} label={g} clickable 
                onClick={() => { setSelectedGenre(g); setPage(1); }}
                sx={{ 
                    bgcolor: selectedGenre === g ? '#F5C518' : '#2C2C2C', 
                    color: selectedGenre === g ? 'black' : 'white',
                    fontWeight: selectedGenre === g ? 'bold' : 'normal'
                }} 
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SortIcon sx={{ color: 'grey.500' }} />
            <FormControl size="small" sx={{ minWidth: 160, bgcolor: '#2C2C2C', borderRadius: 1 }}>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} sx={{ color: 'white' }}>
                <MenuItem value="rating">Top Rated</MenuItem>
                <MenuItem value="year">Newest First</MenuItem>
                <MenuItem value="duration">By Runtime</MenuItem>
                <MenuItem value="title">A - Z</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        {/* Movies Grid */}
        <Grid container spacing={3}>
          {paginatedMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={movie.id}>
              <Card sx={{ 
                bgcolor: '#1A1A1A', color: 'white', height: '100%', 
                display: 'flex', flexDirection: 'column',
                transition: '0.3s', border: '1px solid #333',
                '&:hover': { transform: 'translateY(-5px)', borderColor: '#F5C518' }
              }}>
                <CardMedia
                  component="img"
                  height="360"
                  image={movie.poster}
                  alt={movie.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <StarIcon sx={{ color: '#F5C518', fontSize: '1.2rem', mr: 0.5 }} />
                    <Typography variant="body1" fontWeight="bold">{movie.rating}</Typography>
                    <Typography variant="caption" sx={{ ml: 'auto', color: 'grey.500' }}>{movie.year}</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, height: '48px', overflow: 'hidden' }}>
                    {movie.title}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'grey.400' }}>
                    <AccessTimeIcon sx={{ fontSize: '0.9rem' }} />
                    <Typography variant="caption">{movie.duration} min</Typography>
                  </Stack>
                </CardContent>

                {isAdmin && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 1, borderTop: '1px solid #333' }}>
                    <IconButton size="small" sx={{ color: '#F5C518' }} onClick={() => navigate(`/admin/edit/${movie.id}`)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(movie.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination Info */}
        <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ color: 'grey.500', fontSize: '1.1rem' }}>
            Showing <b>{filteredMovies.length}</b> Movies (Page {page} of {totalPages})
          </Typography>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={(e, v) => { setPage(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            size="large"
            sx={{ 
                '& .MuiPaginationItem-root': { color: 'white', bgcolor: '#2C2C2C' },
                '& .Mui-selected': { bgcolor: '#F5C518 !important', color: 'black', fontWeight: 'bold' }
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
export default HomePage;