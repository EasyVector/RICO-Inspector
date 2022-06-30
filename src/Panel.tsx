import React, {ChangeEvent} from 'react';
import "./Panel.css"
import {AxiosResponse} from "axios";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Items from "./Item";
import { ItemArray } from "./Item"
import {Button} from "react-bootstrap";

type PanelData = {
	json_data:string,
	img_data:string,
	options: ItemArray,
	items:ItemArray,
	itemsPerPage: number,
	itemOffset:number,
	pageCount:number,
	pageNum:number,
	inputNum:number,
	inputNumDisplay:number
}

class Panel extends React.Component<{},PanelData> {
	private myRef: React.RefObject<HTMLCanvasElement>;
	constructor(props:{}) {
		super(props);
		this.state = {
			json_data: "",
			img_data: "",
			options: [],
			items:[],
			itemsPerPage: 1,
			itemOffset:0,
			pageCount:0,
			pageNum:0,
			inputNum:0,
			inputNumDisplay:1,
		};

		axios({
			method: 'get',
			url: 'http://127.0.0.1:8082/api/v1/get_data',
			responseType: 'json',
		})
		.then((response:AxiosResponse)=> {
			const newOffset = this.state.itemsPerPage % this.state.options.length;
			const endOffset = this.state.itemOffset + this.state.itemsPerPage;
			this.setState({
				options:response.data,
				items:response.data.slice(newOffset, endOffset),
			})
		});

		this.myRef = React.createRef();
	}

	private handlePageClick = (event:{ selected: number }) => {
		const newOffset = (event.selected * this.state.itemsPerPage) % this.state.options.length;
		const endOffset = newOffset + this.state.itemsPerPage;
		this.setState({
			items:this.state.options.slice(newOffset, endOffset),
			itemOffset:newOffset,
			pageNum:event.selected
		});
	};

	componentDidMount() {

	}

	private goto = ()=>{
		this.handlePageClick({selected:this.state.inputNum})
	}

	private setInputPageNum = (event:ChangeEvent<HTMLInputElement>)=>{
		this.setState({
			inputNum:Number(event.target.value)-1,
			inputNumDisplay:Number(event.target.value)
		})
	}

	componentWillUnmount() {

	}

	render() {
		return (
			<div className="container mx-auto w-full my-10">
				<div className="container mx-auto">
					{this.state.items.length > 0 &&
                        <Items items={this.state.items}/>
					}
				</div>

				<div className="flex justify-center">
					<ReactPaginate
						breakLabel="..."
						nextLabel="Next"
						onPageChange={this.handlePageClick}
						pageRangeDisplayed={5}
						forcePage={this.state.pageNum}
						pageClassName="inline-flex"
						pageLinkClassName="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						previousLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						previousClassName="inline-flex"
						nextClassName="inline-flex"
						nextLinkClassName="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						breakLinkClassName="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
						breakClassName="inline-flex"
						containerClassName="inline-flex -space-x-px"
						activeLinkClassName="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
						activeClassName="inline-flex"
						pageCount={Math.ceil(this.state.options.length*1.0/this.state.itemsPerPage)}
						previousLabel="Previous"
					/>
					<input type="number" className="inline-flex -space-x-px block p-2.5 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" value={this.state.inputNumDisplay} onChange={this.setInputPageNum}/>
					<Button className="inline-flex -space-x-px py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={this.goto}>GOTO</Button>
				</div>
			</div>
		);
	}
}

export default Panel;
