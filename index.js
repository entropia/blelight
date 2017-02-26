const express         = require('express');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');
const morgan          = require('morgan');
const exphbs          = require('express-handlebars');

const path            = require('path');

const app = express();

const ble = require('./ble.js');

let count = 0;

const colors = {
	R: [1023,0,0],
	G: [0,1023,0],
	B: [0,0,1023],
	//WW:[0,0,0,1023,0],
	//CW:[0,0,0,0,1023],
};

let buffer = [0, 0, 0, 0, 0, 0, 0, 0];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
	helpers: {
		title: 'Supernovum',
		ifdef: (variable, options) => {
			if (typeof variable !== 'undefined') {
				return options.fn(this);
			}
			return options.inverse(this);
		},
		times: (n, block) => {
			let accum = '';
			for  (let i = 0; i < n; ++i) {
				accum += block.fn(i);
			}
			return accum;
		}
	}
}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'static')));

const between = (val, min, max) => (val >= min && val <= max);

app.get('/', (req, res) => {
	res.redirect('/control');
});

app.get('/control', (req, res) => {
	res.render('control',{
		channelCount: ble.channelCount(),
		sliders: [
			{
				title: 'BOT WW',
				color: '#ffff80',
				val: buffer[0],
			},
			{
				title: 'BOT WW',
				color: '#ffff80',
				val: buffer[1],
			},
			{
				title: 'BOT CW',
				color: '#e6eeff',
				val: buffer[2],
			},
			{
				title: 'BOT CW',
				color: '#e6eeff',
				val: buffer[3],
			},

			{
				title: 'TOP WW',
				color: '#ffff80',
				val: buffer[4],
			},
			{
				title: 'TOP CW',
				color: '#e6eeff',
				val: buffer[5],
			},
			{
				title: 'TOP R',
				color: 'red',
				val: buffer[6],
			},
			{
				title: 'TOP G',
				color: 'green',
				val: buffer[7],
			},
			{
				title: 'TOP B',
				color: 'blue',
				val: buffer[8],
			}
		],
	});
});

app.post('/set', (req, res) => {
	if (('channel' in req.body) && ('val' in req.body)) {
		if (between(req.body.val, 0, 1023) && between(req.body.channel, 0, ble.channelCount() - 1)) {
			buffer[req.body.channel] = req.body.val;
			ble.set(req.body.channel, req.body.val);
			res.json({
				status: 'okay'
			});
		} else {
			res.status(400).json({
				status: 'error',
				message: `out of bounds! val: 0...1023; channel: 0...${ble.channelCount() - 1}`
			});
		}
	} else {
		res.status(400).json({
			status: 'error',
			message: 'plase post channel and val!'
		});
	}
});

ble.init
.then(() => {
	app.listen(3000, () => {
		console.log('Webinterface up localhost:3000');
	});
});
/*
setTimeout(() => {
	setInterval(() => {
		ble.set(6, colors.R[count]);
		ble.set(7, colors.G[count]);
		ble.set(8, colors.B[count]);
	//	ble.set(4, colors.B[count]);
	//	ble.set(5, colors.B[count]);
		count++;
		if(count == 4) count = 0;
	}, 30000);
}, 5000);

*/
