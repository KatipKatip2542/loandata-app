export const HeaderAPI = (Token) => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
  };
  