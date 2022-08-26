import React, { useState } from 'react'
import './uploader.css'
import './progress.css'
import axios from 'axios';
import Navbar from './Navbar';
import { customData } from './demoJSON'

const Uploader = () => {

    const [selectedFile1, setSelectedFile1] = useState();
    const [selectedFile2, setSelectedFile2] = useState();
    const [loading, setLoading] = useState('');
    const [valid, setValid] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState();

    // const blowFifty = customData[0].above_50_percentage
    // const AccDepartment = customData[0].sales_Acc_Department[0].department_1

    // console.log(AccDepartment)



    const changeHandler1 = (event) => {

        const isValidFileUploaded = (file) => {
            const validExtensions = ['xls', 'xlsx']
            const fileExtension = file.name.split('.')[1]
            return validExtensions.includes(fileExtension)
        }

        let validate = isValidFileUploaded(event.target.files[0])

        if (validate) {
            setSelectedFile1(event.target.files[0]);
            setValid("file is selected")
        } else {
            setError("Invalid file")
        }
       
        setSelectedFile1(event.target.files[0]);


    };

    const changeHandler2 = (event) => {

        const isValidFileUploaded = (file) => {
            const validExtensions = ['xls', 'xlsx']
            const fileExtension = file.name.split('.')[1]
            return validExtensions.includes(fileExtension)
        }

        let validate = isValidFileUploaded(event.target.files[0])

        if (validate) {
            setSelectedFile2(event.target.files[0]);
            setValid("file is selected")
        } else {
            setError("Invalid file")
        }

        setSelectedFile2(event.target.files[0]);
    };

    const handleSubmission = async (event) => {
        setData()
        setLoading('loading')
        event.preventDefault()
        const formData = new FormData();

        formData.append('file1', selectedFile1);
        formData.append('fileName1', selectedFile1.name);
        formData.append('file2', selectedFile2);
        formData.append('fileName2', selectedFile2.name);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        }

        const response = await axios.post('http://13.52.206.141:5000', formData, config)
            // console.log(response)
            setData(response)
            setLoading(response)


    };

    // console.log(data.data.AvgMarkup, "dddd")


    return (
        <>
            <Navbar />
            <div className="container-fluid overflow-hidden">
                <div className="row">
                    <div className="col-lg-2 bg-dark">
                        <form method="post" className="container-height border-danger">
                            <div className="row px-2 px-lg-0 ">
                                <div className="col-lg-12 col-6 px-2 px-lg-4">
                                    <div className="form">
                                        <input type="file" name="file" onChange={changeHandler1} accept=".xlsx, .xls" required />

                                        {selectedFile1 ?
                                            <>
                                                <div className='details'>
                                                    <p>{selectedFile1.name}<br />
                                                        {selectedFile1.type}<br />
                                                        {selectedFile1.size / 1024} kb<br />
                                                        {/* <b className='valid'>{valid}</b> */}
                                                        {/* <b>{error}</b> */}
                                                    </p>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className='details'>
                                                    <div className='plus-box'>
                                                        <div className="plus"></div>
                                                    </div>
                                                    <p>File From Inventory tab</p>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-12 col-6 px-2 px-lg-4">
                                    <div className="form">
                                        <input type="file" name="file" onChange={changeHandler2} required />
                                        {selectedFile2 ?
                                            <>
                                                <div className='details'>
                                                    <p>{selectedFile2.name}<br />
                                                        {selectedFile2.type}<br />
                                                        {selectedFile2.size / 1024} kb<br />
                                                        {/* <b className='valid'>{valid}</b> */}
                                                        {/* <b >{error}</b> */}
                                                    </p>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="details">
                                                    <div className='plus-box'>
                                                        <div className="plus"></div>
                                                    </div>
                                                    {/* <p>File From Item Sales tab. click on Department wise sales and download using date range in excel.</p> */}
                                                    <p>File From Item Sales tab.</p>

                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row px-2 px-lg-0">
                                <div className="col-lg-12 col-12 px-1 px-lg-4">
                                    {loading == "loading"?
                                        // <button className="bar button" onClick={handleSubmission} type="submit" disabled>Upload</button>
                                        <div className="meter">
                                            <button className="button progress" onClick={handleSubmission} style={{ width: "100%" }} disabled>Upload</button>
                                        </div> :
                                        <>
                                            {/* <button className="button" onClick={handleSubmission} type="submit" >Upload</button> */}
                                            <div className="meter">
                                                <button className="button" onClick={handleSubmission} style={{ width: "100%" }}>Upload</button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-10 col-12 g-0" >

                        <div className="row">
                            <div className="col-12 row-main-content overflow-auto">
                                {data ?
                                    <>
                                        <div className="output">
                                            <p>AvgMarkup : {data.data.AvgMarkup}</p>
                                            <p>qty : {data.data.qty}</p>
                                            <p>sales : {data.data.sales}</p>
                                            <p>totalAvgMarkup : {data.data.totalAvgMarkup}</p>
                                            <p>totalProfit : {data.data.totalProfit}</p>
                                        </div>
                                    </>
                                    :
                                    <>  <div className="output">
                                        <h4 className='bg-light p-2'>Total data</h4>
                                        {/* <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>AvgMarkup : {customData[0].TotalMarkup}</td>
                                                </tr>
                                                <tr>
                                                    <td>qty : {customData[0].TotalMarkup}</td>
                                                </tr>
                                                <tr>
                                                    <td>sales : {customData[0].TotalSales}</td>
                                                </tr>
                                                <tr>
                                                    <td>totalAvgMarkup : {customData[0].TotalProfit}</td>
                                                </tr>
                                                <tr>
                                                    <td>totalProfit : {customData[0].TotalQtySold}</td>
                                                </tr>
                                            </tbody>
                                        </table> */}
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">TotalMarkup</th>
                                                    <th scope="col">TotalMarkup</th>
                                                    <th scope="col">TotalSales</th>
                                                    <th scope="col">TotalProfit</th>
                                                    <th scope="col">TotalQtySold</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{customData[0].TotalMarkup}</td>
                                                    <td>{customData[0].TotalMarkup}</td>
                                                    <td>{customData[0].TotalSales}</td>
                                                    <td>{customData[0].TotalProfit}</td>
                                                    <td>{customData[0].TotalQtySold}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <h4 className='bg-light p-2'>Product Without CP</h4>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S No.</th>
                                                    <th scope="col">SKU</th>
                                                    {/* <th scope="col">Cost Price</th> */}
                                                    <th scope="col">Item No</th>
                                                    <th scope="col">Mark Up</th>
                                                    <th scope="col">Profit</th>
                                                    <th scope="col">Quality Sold</th>
                                                    <th scope="col">Sale Amount</th>
                                                    <th scope="col">Sale Amount</th>
                                                </tr>
                                            </thead>
                                            {customData[0].product_without_cp.map((item,index) => (<tbody>
                                                <tr>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{item.SKU}</td>
                                                    {/* <td>{item.cost_price}</td> */}
                                                    <td>{item.itemNo}</td>
                                                    <td>{item.markup}</td>
                                                    <td>{item.profit}</td>
                                                    <td>{item.qty_Sold}</td>
                                                    <td>{item.saleAmount}</td>
                                                    <td>{item.selling_price}</td>
                                                </tr>
                                            </tbody>))}
                                        </table>


                                        <h4 className='bg-light p-2'>Below 20%</h4>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S No.</th>
                                                    <th scope="col">SKU</th>
                                                    <th scope="col">Cost Price</th>
                                                    <th scope="col">Item No</th>
                                                    <th scope="col">Mark Up</th>
                                                    <th scope="col">Profit</th>
                                                    <th scope="col">Quality Sold</th>
                                                    <th scope="col">Sale Amount</th>
                                                    <th scope="col">Sale Amount</th>
                                                </tr>
                                            </thead>
                                            {customData[0].below_20_percentage.map((item,index) => (<tbody>
                                                <tr>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{item.SKU}</td>
                                                    <td>{item.cost_price}</td>
                                                    <td>{item.itemNo}</td>
                                                    <td>{item.markup}</td>
                                                    <td>{item.profit}</td>
                                                    <td>{item.qty_Sold}</td>
                                                    <td>{item.saleAmount}</td>
                                                    <td>{item.selling_price}</td>
                                                </tr>
                                            </tbody>))}
                                        </table>
                                        
                                        
                                        
                                        <h4 className='bg-light p-2'>20% - 30%</h4>
                                                
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S No.</th>
                                                    <th scope="col">SKU</th>
                                                    <th scope="col">Cost Price</th>
                                                    <th scope="col">Item No</th>
                                                    <th scope="col">Mark Up</th>
                                                    <th scope="col">Profit</th>
                                                    <th scope="col">Quality Sold</th>
                                                    <th scope="col">Sale Amount</th>
                                                    <th scope="col">Sale Amount</th>
                                                </tr>
                                            </thead>
                                            {customData[0]._20_to_30_percentage.map((item, index) => (<tbody>
                                                <tr>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{item.SKU}</td>
                                                    <td>{item.cost_price}</td>
                                                    <td>{item.itemNo}</td>
                                                    <td>{item.markup}</td>
                                                    <td>{item.profit}</td>
                                                    <td>{item.qty_Sold}</td>
                                                    <td>{item.saleAmount}</td>
                                                    <td>{item.selling_price}</td>
                                                </tr>
                                            </tbody>))}
                                        </table>
                                        <h4 className='bg-light p-2'>30% - 40%</h4>

                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S No.</th>
                                                    <th scope="col">SKU</th>
                                                    <th scope="col">Cost Price</th>
                                                    <th scope="col">Item No</th>
                                                    <th scope="col">Mark Up</th>
                                                    <th scope="col">Profit</th>
                                                    <th scope="col">Quality Sold</th>
                                                    <th scope="col">Sale Amount</th>
                                                    <th scope="col">Sale Amount</th>
                                                </tr>
                                            </thead>
                                            {customData[0]._30_to_40_percentage.map((item, index) => (<tbody>
                                                <tr>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{item.SKU}</td>
                                                    <td>{item.cost_price}</td>
                                                    <td>{item.itemNo}</td>
                                                    <td>{item.markup}</td>
                                                    <td>{item.profit}</td>
                                                    <td>{item.qty_Sold}</td>
                                                    <td>{item.saleAmount}</td>
                                                    <td>{item.selling_price}</td>
                                                </tr>
                                            </tbody>))}
                                        </table>

                                        <h4 className='bg-light p-2'>40% - 50%</h4>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S No.</th>
                                                    <th scope="col">SKU</th>
                                                    <th scope="col">Cost Price</th>
                                                    <th scope="col">Item No</th>
                                                    <th scope="col">Mark Up</th>
                                                    <th scope="col">Profit</th>
                                                    <th scope="col">Quality Sold</th>
                                                    <th scope="col">Sale Amount</th>
                                                    <th scope="col">Sale Amount</th>
                                                </tr>
                                            </thead>
                                            {customData[0]._40_to_50_percentage.map((item, index) => (<tbody>
                                                <tr>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{item.SKU}</td>
                                                    <td>{item.cost_price}</td>
                                                    <td>{item.itemNo}</td>
                                                    <td>{item.markup}</td>
                                                    <td>{item.profit}</td>
                                                    <td>{item.qty_Sold}</td>
                                                    <td>{item.saleAmount}</td>
                                                    <td>{item.selling_price}</td>
                                                </tr>
                                            </tbody>))}
                                        </table>

                                        <h4 className='bg-light p-2'>Above 50%</h4>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S No.</th>
                                                    <th scope="col">SKU</th>
                                                    <th scope="col">Cost Price</th>
                                                    <th scope="col">Item No</th>
                                                    <th scope="col">Mark Up</th>
                                                    <th scope="col">Profit</th>
                                                    <th scope="col">Quality Sold</th>
                                                    <th scope="col">Sale Amount</th>
                                                    <th scope="col">Sale Amount</th>
                                                </tr>
                                            </thead>
                                            {customData[0].above_50_percentage.map((item,index) => (<tbody>
                                                <tr>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{item.SKU}</td>
                                                    <td>{item.cost_price}</td>
                                                    <td>{item.itemNo}</td>
                                                    <td>{item.markup}</td>
                                                    <td>{item.profit}</td>
                                                    <td>{item.qty_Sold}</td>
                                                    <td>{item.saleAmount}</td>
                                                    <td>{item.selling_price}</td>
                                                </tr>
                                            </tbody>))}
                                        </table>

                                        <h4 className='bg-light p-2'>Department 1</h4>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S No.</th>
                                                    <th scope="col">SKU</th>
                                                    <th scope="col">Cost Price</th>
                                                    <th scope="col">Item No</th>
                                                    <th scope="col">Mark Up</th>
                                                    <th scope="col">Profit</th>
                                                    <th scope="col">Quality Sold</th>
                                                    <th scope="col">Sale Amount</th>
                                                    <th scope="col">Sale Amount</th>
                                                </tr>
                                            </thead>
                                            {customData[0].sales_Acc_Department[0].department_1.map((item,index) => (<tbody>
                                                <tr>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{item.SKU}</td>
                                                    <td>{item.cost_price}</td>
                                                    <td>{item.itemNo}</td>
                                                    <td>{item.markup}</td>
                                                    <td>{item.profit}</td>
                                                    <td>{item.qty_Sold}</td>
                                                    <td>{item.saleAmount}</td>
                                                    <td>{item.selling_price}</td>
                                                </tr>
                                            </tbody>))}
                                        </table>
                                        <h4 className='bg-light p-2'>Department 2</h4>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S No.</th>
                                                    <th scope="col">SKU</th>
                                                    <th scope="col">Cost Price</th>
                                                    <th scope="col">Item No</th>
                                                    <th scope="col">Mark Up</th>
                                                    <th scope="col">Profit</th>
                                                    <th scope="col">Quality Sold</th>
                                                    <th scope="col">Sale Amount</th>
                                                    <th scope="col">Sale Amount</th>
                                                </tr>
                                            </thead>
                                            {customData[0].sales_Acc_Department[0].department_2.map((item,index) => (<tbody>
                                                <tr>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{item.SKU}</td>
                                                    <td>{item.cost_price}</td>
                                                    <td>{item.itemNo}</td>
                                                    <td>{item.markup}</td>
                                                    <td>{item.profit}</td>
                                                    <td>{item.qty_Sold}</td>
                                                    <td>{item.saleAmount}</td>
                                                    <td>{item.selling_price}</td>
                                                </tr>
                                            </tbody>))}
                                        </table>

                                        
                                        </div>
                                    
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Uploader