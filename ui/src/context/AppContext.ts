import React from 'react';

interface AppContext {
  onChangeUserLocale: any;
  userLocale: string;
}

export default React.createContext<AppContext>({
  onChangeUserLocale: '',
  userLocale: '',
});
