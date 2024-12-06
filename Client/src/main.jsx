import { createRoot } from 'react-dom/client'
import { store } from '~/libs/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '~/theme'
import App from './App.jsx'
import "bootstrap-icons/font/bootstrap-icons.css"
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</Provider>,
)
