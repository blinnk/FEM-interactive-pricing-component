import { useEffect, useState, useRef } from 'react';
import Slider from 'rc-slider';
import Toggle from 'react-toggle';
import './toggle.scss';
import 'rc-slider/assets/index.css';
import './base.scss';
import checkmark from './images/icon-check.svg';
import slider_handle from './images/icon-slider.svg';

function App() {
	return (
		<div className='App'>
			<Header />
			<Card />
		</div>
	);
}

export default App;

const Header = () => {
	return (
		<div className='header'>
			<h1 className='header__h1'>Simple, traffic-based pricing</h1>
			<span className='header__span'>Sign-up for our 30-day trial.</span>
			<span className='header__span'>No credit card required.</span>
		</div>
	);
};

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref;
}

function useCurrent(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const Card = () => {
	const [pageViews, setPageViews] = useState(125);
	const [dollars, setDollars] = useState(20);
	const [billingPeriod, setBillingPeriod] = useState('Month');
	const [togglePeriod, setTogglePeriod] = useState(false);
	const [sliderValue, setSliderValue] = useState(125);

	const prevValue = usePrevious(sliderValue);

	function log(value) {
		return value;
	}

	function yearly(x) {
		x >= prevValue.current ? setDollars(dollars + 48 * 0.75) : setDollars(dollars - 48 * 0.75);
	}

	function monthly(x) {
		x >= prevValue.current ? setDollars(dollars + 4) : setDollars(dollars - 4);
	}

	const yearlyDollars = (x) => {
		return x * 12 * 0.75;
	};

	const monthlyDollars = (x) => {
		return x / 12 / 0.75;
	};

	const onSliderChange = (value) => {
		log(value);
		setSliderValue(value);
		setPageViews(value);
		!togglePeriod ? monthly(value) : yearly(value);
	};

	const onToggleChange = (e) => {
		setTogglePeriod(e.target.checked);
		setBillingPeriod(togglePeriod ? 'Month' : 'Year');

		!togglePeriod ? setDollars(yearlyDollars(dollars)) : setDollars(monthlyDollars(dollars));
	};

	return (
		<div className='card'>
			<div className='card__section-1'>
				<span className='card__pageviews'>
					<span className='pageviews__value'>{pageViews}k </span>
					pageviews
				</span>
				<div className='slider__container'>
					<Slider
						onChange={onSliderChange}
						value={sliderValue}
						step={25}
						min={25}
						max={200}
						handleStyle={{
							background: `#10D8C4 url(${slider_handle}) no-repeat center`,
							border: 'none',
							width: 40,
							height: 40,
							position: 'relative',
							bottom: 10,
						}}
						railStyle={{
							background: '#eaeefb',
							height: 8,
						}}
						trackStyle={{
							background: '#A4F3EB',
							height: 8,
						}}
					/>
				</div>
				<div className='card__subsection-1'>
					<p className='dollars'>
						<span className='dollars__amt'> ${dollars}.00</span>
					</p>
					<p className='billing__period'>/ {billingPeriod}</p>
				</div>
			</div>
			<div className='card__section-2'>
				<div className='billing-cycle-group flex-end'>
					<span className='billing-cycle'>Monthly Billing</span>
				</div>
				<Toggle
					defaultChecked={togglePeriod}
					onChange={onToggleChange}
					className='toggle'
					aria-label='cycle-toggle'
					icons={false}
				/>
				<div className='billing-cycle-group flex-start'>
					<span className='billing-cycle'>Yearly Billing</span>
					<div className='yearly-discount'>
						<span>-25%</span>
					</div>
				</div>
			</div>
			<div className='card__section-3'>
				<ul className='member__perks'>
					<li>
						<img src={checkmark} alt='checkmark' />
						<span>Unlimited websites</span>
					</li>
					<li>
						<img src={checkmark} alt='checkmark' />
						<span>100% data ownership</span>
					</li>
					<li>
						<img src={checkmark} alt='checkmark' />
						<span>Email reports</span>
					</li>
				</ul>
				<button className='btn'>Start my trial</button>
			</div>
		</div>
	);
};
