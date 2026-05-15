import * as React from 'react';
const { useState, useEffect, useRef } = React;

export default function FrostedMoviePlatform() {
  const [auth, setAuth] = useState(null);
  const [search, setSearch] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [videos, setVideos] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [authMode, setAuthMode] = useState('email'); // 'email' or 'phone'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const videoRef = useRef(null);

  const API_URL = 'http://localhost:5000/api';
  const categories = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Animation', 'Documentary', 'Adventure'];

  // Fetch videos on component mount
  useEffect(() => {
    fetchVideos();
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      setAuth(JSON.parse(savedAuth));
    }
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${API_URL}/videos/all`);
      const data = await response.json();
      setVideos(data);
      setFilteredMovies(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  // Live search functionality
  useEffect(() => {
    if (search.trim() === '') {
      filterByCategory(selectedCategory);
    } else {
      const results = videos.filter((video) => {
        const query = search.toLowerCase();
        return (
          video.title.toLowerCase().includes(query) ||
          video.genre.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query) ||
          video.year.toString().includes(query)
        );
      });
      setFilteredMovies(results);
    }
  }, [search]);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredMovies(videos);
    } else {
      setFilteredMovies(videos.filter((v) => v.category === category));
    }
  };

  // Phone OTP Login
  const handleSendPhoneOtp = async () => {
    if (!phoneNumber.trim()) {
      alert('Please enter phone number');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/send-phone-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber }),
      });
      const data = await response.json();
      if (response.ok) {
        setShowOtpInput(true);
        alert('OTP sent to your phone!');
      } else {
        alert(data.error || 'Error sending OTP');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleVerifyPhoneOtp = async () => {
    if (!otp.trim()) {
      alert('Please enter OTP');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/verify-phone-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('auth', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        setAuth(data.user);
        setShowLogin(false);
        setPhoneNumber('');
        setOtp('');
        setShowOtpInput(false);
        alert('✅ Login successful!');
      } else {
        alert(data.error || 'Error verifying OTP');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // Email Signup
  const handleEmailSignup = async () => {
    if (!email || !username || !password) {
      alert('All fields required');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/email-signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setShowSignup(false);
        setAuthMode('email');
        alert('✅ Signup successful! Check your email for OTP verification.');
        // Show OTP input for email verification
        setShowOtpInput(true);
      } else {
        alert(data.error || 'Signup error');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // Email Login
  const handleEmailLogin = async () => {
    if (!email || !password) {
      alert('Email and password required');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/email-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('auth', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        setAuth(data.user);
        setShowLogin(false);
        setEmail('');
        setPassword('');
        alert('✅ Login successful!');
      } else {
        alert(data.error || 'Login error');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // Email OTP Verification
  const handleVerifyEmailOtp = async () => {
    if (!otp.trim()) {
      alert('Please enter OTP');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/verify-email-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('auth', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        setAuth(data.user);
        setShowSignup(false);
        setEmail('');
        setPassword('');
        setUsername('');
        setOtp('');
        setShowOtpInput(false);
        alert('✅ Email verified & Login successful!');
      } else {
        alert(data.error || 'OTP verification error');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    setAuth(null);
  };

  const addToWatchlist = (video) => {
    if (!auth) {
      alert('Please login to add to watchlist');
      return;
    }
    if (!watchlist.find((v) => v._id === video._id)) {
      setWatchlist([...watchlist, video]);
      alert(`✅ ${video.title} added to watchlist`);
    } else {
      alert(`${video.title} already in watchlist`);
    }
  };

  const playMovie = (video) => {
    if (!auth) {
      alert('Please login to watch videos');
      return;
    }
    setActiveMovie(video);
    setVideoOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_#7c3aed,_transparent_30%),radial-gradient(circle_at_bottom_right,_#06b6d4,_transparent_30%),linear-gradient(to_bottom,_#050510,_#09090f)]" />
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 lg:px-12 py-6">
        {/* Navigation */}
        <nav className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl px-6 py-4 flex items-center justify-between shadow-2xl sticky top-4 z-50">
          <div>
            <h1 className="text-2xl font-black tracking-wide">🎬 ENTERZILLA</h1>
            <p className="text-xs text-white/60 italic">Premium Entertainment</p>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition">Home</button>
            <button onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition">Categories</button>
            <button onClick={() => document.getElementById('watchlist-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition">My List</button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search movies, genres..."
              className="bg-white/10 border border-white/10 rounded-2xl px-4 py-2 text-sm outline-none backdrop-blur-lg w-[200px] focus:ring-2 focus:ring-cyan-400 transition-all"
            />

            {auth ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/70">{auth.username}</span>
                <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-2xl font-semibold hover:bg-red-700 transition">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={() => setShowLogin(true)} className="bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-5 py-2 rounded-2xl font-semibold shadow-lg hover:scale-105 transition">
                Login
              </button>
            )}
          </div>
        </nav>

        {/* Advanced Video Player Modal */}
        {videoOpen && activeMovie && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl bg-black rounded-[30px] overflow-hidden border border-white/10 shadow-2xl">
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-2xl font-semibold"
              >
                ✕ Close
              </button>

              <div className="relative bg-black w-full" style={{ paddingBottom: '56.25%' }}>
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  className="absolute inset-0 w-full h-full"
                  controlsList="nodownload"
                >
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="p-6 bg-gradient-to-b from-transparent to-black">
                <h2 className="text-4xl font-black mb-3">{activeMovie.title}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-yellow-400">⭐ {activeMovie.rating}</span>
                  <span className="text-white/70">{activeMovie.genre}</span>
                  <span className="text-white/70">{activeMovie.year}</span>
                  <span className="text-white/70">⏱️ {Math.floor(activeMovie.duration / 60)} min</span>
                </div>
                <p className="text-white/60 max-w-2xl">{activeMovie.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 border border-white/10 rounded-3xl backdrop-blur-2xl p-8 w-full max-w-md">
              <h2 className="text-3xl font-black mb-6">Login to ENTERZILLA</h2>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setAuthMode('email')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition ${
                    authMode === 'email' ? 'bg-cyan-500' : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  📧 Email
                </button>
                <button
                  onClick={() => setAuthMode('phone')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition ${
                    authMode === 'phone' ? 'bg-cyan-500' : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  📱 Phone
                </button>
              </div>

              {authMode === 'email' ? (
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <button
                    onClick={handleEmailLogin}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-bold hover:scale-105 transition mb-3"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setShowLogin(false);
                      setShowSignup(true);
                    }}
                    className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition font-semibold"
                  >
                    Create Account
                  </button>
                </>
              ) : (
                <>
                  {!showOtpInput ? (
                    <>
                      <input
                        type="tel"
                        placeholder="+91 Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full mb-4 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                      <button
                        onClick={handleSendPhoneOtp}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-bold hover:scale-105 transition"
                      >
                        Send OTP
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                        className="w-full mb-4 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-cyan-400 text-center text-2xl tracking-widest"
                      />
                      <button
                        onClick={handleVerifyPhoneOtp}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-bold hover:scale-105 transition"
                      >
                        Verify OTP
                      </button>
                    </>
                  )}
                </>
              )}

              <button
                onClick={() => setShowLogin(false)}
                className="w-full mt-4 py-2 text-white/70 hover:text-white transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Signup Modal */}
        {showSignup && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 border border-white/10 rounded-3xl backdrop-blur-2xl p-8 w-full max-w-md">
              <h2 className="text-3xl font-black mb-6">Create Account</h2>

              {!showOtpInput ? (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-4 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <button
                    onClick={handleEmailSignup}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-bold hover:scale-105 transition mb-3"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <p className="text-white/70 mb-4">OTP sent to {email}</p>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                    className="w-full mb-4 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-cyan-400 text-center text-2xl tracking-widest"
                  />
                  <button
                    onClick={handleVerifyEmailOtp}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-bold hover:scale-105 transition mb-3"
                  >
                    Verify & Create Account
                  </button>
                </>
              )}

              <button
                onClick={() => {
                  setShowSignup(false);
                  setOtp('');
                  setShowOtpInput(false);
                }}
                className="w-full py-2 text-white/70 hover:text-white transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-10 items-center py-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl text-sm text-white/70 mb-6">
              ✨ Advanced Entertainment Platform
            </div>

            <h2 className="text-5xl lg:text-7xl font-black leading-tight">
              Stream & Download
              <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                {' '}Movies
              </span>
            </h2>

            <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-xl">
              Experience cinema like never before with live search, advanced video player,
              phone OTP login, email verification, personalized watchlists, and 100+ movies
              across diverse categories.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-bold shadow-2xl hover:scale-105 transition"
              >
                Explore Movies
              </button>

              {!auth && (
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-8 py-4 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl hover:bg-white/20 transition font-bold"
                >
                  Start Watching
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                ['100+', 'Videos'],
                ['10', 'Categories'],
                ['4K', 'Quality'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-5 text-center"
                >
                  <div className="text-3xl font-black">{value}</div>
                  <div className="text-white/60 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-fuchsia-500/30 blur-3xl" />
            <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[32px] overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.08)]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-[500px] w-full object-cover"
                src="https://www.w3schools.com/html/mov_bbb.mp4"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold">Featured Collection</h3>
                <p className="text-white/60 mt-1">Premium Content</p>
                {auth && (
                  <button
                    onClick={() =>
                      playMovie({
                        title: 'Featured Collection',
                        genre: 'Premium',
                        year: 2026,
                        rating: 9.4,
                        duration: 7200,
                        description: 'Best of the best content',
                      })
                    }
                    className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-bold hover:scale-105 transition"
                  >
                    ▶ Watch Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-10">
          <h3 className="text-3xl font-black mb-6">Browse by Category</h3>
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => filterByCategory(category)}
                className={`px-6 py-3 rounded-2xl font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-500'
                    : 'bg-white/10 border border-white/10 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {search && (
            <div className="mb-6 text-white/70 text-lg">
              🔍 Search results for: <span className="text-cyan-400 font-bold">"{search}"</span>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((video) => (
                <div
                  key={video._id}
                  className="group bg-white/10 border border-white/10 rounded-[20px] overflow-hidden backdrop-blur-2xl hover:-translate-y-2 transition duration-300 shadow-xl"
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-fuchsia-600 to-cyan-500 h-48 flex items-center justify-center">
                    <div className="text-6xl">🎬</div>
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur px-2 py-1 rounded-lg text-sm font-bold">
                      ⭐ {video.rating}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-lg font-bold line-clamp-2">{video.title}</h4>
                    <p className="text-white/60 text-sm mt-1">
                      {video.genre} • {video.year}
                    </p>
                    <p className="text-white/50 text-xs mt-2 line-clamp-2">{video.description}</p>

                    {auth && (
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => playMovie(video)}
                          className="flex-1 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-bold text-sm hover:scale-105 transition"
                        >
                          ▶ Watch
                        </button>
                        <button
                          onClick={() => addToWatchlist(video)}
                          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition font-semibold text-sm"
                        >
                          ♥
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white/10 border border-white/10 rounded-[20px] p-10 text-center backdrop-blur-2xl">
                <h3 className="text-2xl font-black mb-2">❌ No Videos Found</h3>
                <p className="text-white/60">Try searching with different keywords or select another category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Watchlist Section */}
        {auth && (
          <section id="watchlist-section" className="py-10">
            <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[30px] p-8">
              <h3 className="text-3xl font-black mb-6">❤️ My Watchlist</h3>

              {watchlist.length === 0 ? (
                <p className="text-white/60">No videos added yet. Start building your watchlist!</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {watchlist.map((video) => (
                    <div
                      key={video._id}
                      className="bg-white/5 border border-white/10 rounded-lg p-4"
                    >
                      <h4 className="font-bold">{video.title}</h4>
                      <p className="text-white/60 text-sm">{video.genre}</p>
                      <button
                        onClick={() => playMovie(video)}
                        className="mt-3 w-full py-2 bg-cyan-500 rounded-lg font-semibold hover:bg-cyan-600 transition"
                      >
                        Watch Now
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-16 mb-6 bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[30px] p-8 text-center">
          <h5 className="text-2xl font-black">🎬 ENTERZILLA</h5>
          <p className="text-white/60 mt-2">Premium Entertainment Platform • 2026</p>
          <p className="text-white/40 text-sm mt-4">Made with ❤️ by Harsh Kumar</p>
        </footer>
      </div>
    </div>
  );
}
