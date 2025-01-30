export function handsomeItemsCount(items: any[]): string {
    const count = items.length;
      const lastDigit = count % 10;
      const lastTwoDigits = count % 100;
  
      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
          return 'товаров';
      }
      if (lastDigit === 1) {
          return 'товар';
      }
      if (lastDigit >= 2 && lastDigit <= 4) {
          return 'товара';
      }
      return 'товаров';
  }