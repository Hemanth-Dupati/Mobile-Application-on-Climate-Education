import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

export default function App() {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [bingoScore, setBingoScore] = useState(0);
  const [wordPuzzleScore, setWordPuzzleScore] = useState(0);
  const [vocabularyScore, setVocabularyScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [vocabularyQuizCompleted, setVocabularyQuizCompleted] = useState(false);

  const vocabularyQuestions = [
    {
      question: 'What is the primary greenhouse gas?',
      options: ['Carbon Dioxide', 'Methane', 'Nitrous Oxide', 'Ozone'],
      answer: 'Carbon Dioxide'
    },
    {
      question: 'Which of the following is not a renewable energy source?',
      options: ['Solar', 'Coal', 'Wind', 'Hydroelectric'],
      answer: 'Coal'
    },
    {
      question: 'What causes ocean acidification?',
      options: ['Excess carbon dioxide', 'Oil spills', 'Overfishing', 'Acid rain'],
      answer: 'Excess carbon dioxide'
    }
  ];

  const handleLogin = () => {
    console.log('Logged in as:', username);
    setLoggedIn(true);
  };

  const handleGameSelection = (game) => {
    setSelectedGame(game);
    setCurrentQuestionIndex(0); // Reset current question index
    setVocabularyQuizCompleted(false); // Reset quiz completion status
    setVocabularyScore(0); // Reset vocabulary score
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setSelectedGame(null);
  };

  const handleBingoScore = () => {
    setBingoScore(bingoScore + 1);
  };

  const handleWordPuzzleScore = () => {
    setWordPuzzleScore(wordPuzzleScore + 1);
  };

  const handleVocabularyAnswer = () => {
    const currentQuestion = vocabularyQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      setVocabularyScore(vocabularyScore + 1); // Increase score if the answer is correct
    } else {
      setVocabularyScore(Math.max(0, vocabularyScore - 1)); // Decrease score if the answer is wrong
    }
    // Move to the next question
    if (currentQuestionIndex < vocabularyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // Reset selected answer
    } else {
      // Quiz completed
      setVocabularyQuizCompleted(true);
    }
  };

  const renderVocabularyQuiz = () => {
    const currentQuestion = vocabularyQuestions[currentQuestionIndex];
    return (
      <View style={styles.gameContainer}>
        <Text style={styles.subtitle}>Vocabulary Quiz</Text>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedAnswer === option ? styles.selectedButton : null,
              selectedAnswer !== currentQuestion.answer && selectedAnswer === option ? styles.wrongAnswer : null,
            ]}
            onPress={() => setSelectedAnswer(option)}
          >
            <Text style={styles.buttonText}>{option}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={handleVocabularyAnswer}
          disabled={!selectedAnswer}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        {vocabularyQuizCompleted && (
          <Text style={styles.score}>Vocabulary Score: {vocabularyScore}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={() => setSelectedGame(null)}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderGame = () => {
    switch (selectedGame) {
      case 'Bingo':
        return (
          <View style={styles.gameContainer}>
            <Text style={styles.subtitle}>Bingo</Text>
            <TouchableOpacity style={styles.button} onPress={handleBingoScore}>
              <Text style={styles.buttonText}>Increase Bingo Score</Text>
            </TouchableOpacity>
            <Text style={styles.score}>Bingo Score: {bingoScore}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setSelectedGame(null)}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        );
      case 'WordPuzzle':
        return (
          <View style={styles.gameContainer}>
            <Text style={styles.subtitle}>Word Puzzle</Text>
            <TouchableOpacity style={styles.button} onPress={handleWordPuzzleScore}>
              <Text style={styles.buttonText}>Increase Word Puzzle Score</Text>
            </TouchableOpacity>
            <Text style={styles.score}>Word Puzzle Score: {wordPuzzleScore}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setSelectedGame(null)}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        );
      case 'VocabularyQuiz':
        return renderVocabularyQuiz();
      default:
        return (
          <View style={styles.gameContainer}>
            <Text style={styles.subtitle}>Choose a Game</Text>
            <TouchableOpacity style={styles.gameButton} onPress={() => handleGameSelection('Bingo')}>
              <Text style={styles.buttonText}>Bingo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gameButton} onPress={() => handleGameSelection('WordPuzzle')}>
              <Text style={styles.buttonText}>Word Puzzle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gameButton} onPress={() => handleGameSelection('VocabularyQuiz')}>
              <Text style={styles.buttonText}>Vocabulary Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <ImageBackground source={require('./photo1.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Climate Change Education</Text>
        {!loggedIn ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={username}
              onChangeText={text => setUsername(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          renderGame()
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  gameButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  wrongAnswer: {
    backgroundColor: 'red',
  },
  gameContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  score: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  word: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
});
