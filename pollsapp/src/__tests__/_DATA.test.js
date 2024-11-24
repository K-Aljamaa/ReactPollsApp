// src/__tests__/_DATA.test.js
import { _saveQuestion, _saveQuestionAnswer } from '../_DATA';

describe('_DATA.js', () => {
  // Test 1: Verify _saveQuestion with correct data
  test('_saveQuestion should save correctly formatted question', async () => {
    const questionData = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: 'sarahedo'
    };

    const savedQuestion = await _saveQuestion(questionData);
    
    expect(savedQuestion).toBeDefined();
    expect(savedQuestion.id).toBeDefined();
    expect(savedQuestion.timestamp).toBeDefined();
    expect(savedQuestion.author).toBe(questionData.author);
    expect(savedQuestion.optionOne.text).toBe(questionData.optionOneText);
    expect(savedQuestion.optionTwo.text).toBe(questionData.optionTwoText);
    expect(savedQuestion.optionOne.votes).toEqual([]);
    expect(savedQuestion.optionTwo.votes).toEqual([]);
  });

  // Test 2: Verify _saveQuestion with incorrect data
  test('_saveQuestion should fail with incorrect data', async () => {
    const invalidQuestionData = {
      optionOneText: undefined,
      optionTwoText: 'Option Two',
      author: 'sarahedo'
    };

    await expect(_saveQuestion(invalidQuestionData)).rejects.toBeDefined();
  });

  // Test 3: Verify _saveQuestionAnswer with correct data
  test('_saveQuestionAnswer should save correctly formatted answer', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };

    const result = await _saveQuestionAnswer(answerData);
    expect(result).toBe(true);
  });

  // Test 4: Verify _saveQuestionAnswer with incorrect data
  test('_saveQuestionAnswer should fail with incorrect data', async () => {
    const invalidAnswerData = {
      authedUser: undefined,
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };

    await expect(_saveQuestionAnswer(invalidAnswerData)).rejects.toBeDefined();
  });
});