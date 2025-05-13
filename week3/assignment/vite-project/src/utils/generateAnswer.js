export default function generateAnswer() {
    const digits = [];
    while (digits.length < 3) {
      const num = Math.floor(Math.random() * 10);
      if (!digits.includes(num)) digits.push(num);
    }
    return digits;
  }
  