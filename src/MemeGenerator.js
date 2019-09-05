import React,{Component} from 'react';

class MemeGenerator extends Component{

	handleChange(event){
		const {name,value}=event.target;
		this.setState({[name]:value});
	}

	generationImg(event){
		event.preventDefault();
		const number=Math.round(Math.random()*this.state.allMemeImgs.length);
		this.setState({randomImage:this.state.allMemeImgs[number].url});

	}

	componentDidMount(){
		fetch('https://api.imgflip.com/get_memes')
			.then(response=>response.json())
			.then(response=>{
				const {memes}=response.data;
				this.setState({allMemeImgs:memes});
			});
			this.handleChange=this.handleChange.bind(this);
			this.generationImg=this.generationImg.bind(this);
	}

	constructor(){
		super();
		this.state={
			topText:'',
			bottomText:'',
			randomImage:'http://i.imgflip.com/1bij.jpg',
			allMemeImgs:[]
		}
	}

	render(){
		return (
			<div>
				<form className='meme-form' onSubmit={this.generationImg}>
					<input name='topText' type='text' onChange={this.handleChange} placeholder='Top Text' value={this.state.topText}/>
					<input name='bottomText' type='text' onChange={this.handleChange} placeholder='Bottom Text' value={this.state.bottomText}/>
					

					<button>Gen</button>
				</form>
				<div className='meme'>
					<img align='center' size='50%' alt='' src={this.state.randomImage}/>
					<h2 className='top'>{this.state.topText}</h2>
					<h2 className='bottom'>{this.state.bottomText}</h2>
				</div>
			</div>
		)
	}
}

export default MemeGenerator;