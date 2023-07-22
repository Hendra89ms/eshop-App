import RightTable from './RightTable'
import { Product_list } from '../product_list';
import { useContext } from 'react'
import { StateContext } from '../../../store/stateContext'

function Product() {

    const formatToRupiah = (value) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
        const formattedValue = formatter.format(value);
        return formattedValue.replace('Rp', '');
    };

    // GLOBAL STATE
    const { filterHarga, handleFilterHargaChange, handleTypeFilter, handleResetFilters, selectNav, setSelectNav, handleFilterBrand, filterBrand } = useContext(StateContext)


    const handleFilterSelect = (border) => {
        if (border === 'phone') {
            setSelectNav('phone')
            handleTypeFilter('phone')
        }
        if (border === 'laptop') {
            setSelectNav('laptop')
            handleTypeFilter('laptop')
        }
        if (border === 'electronics') {
            setSelectNav('electronics')
            handleTypeFilter('electronics')
        }
        if (border === 'fashion') {
            setSelectNav('fashion')
            handleTypeFilter('fashion')
        }
        if (border === 'all') {
            setSelectNav('all')
            handleTypeFilter('')
        }

    }

    const borderColor = "border-[orangeRed] border-l-4 px-1"

    return (
        <div id='products' className='w-full md:w-[1000px] mx-auto flex my-20 h-max'>
            <div className='flex-[0.2] '>
                {/* LEFT CONTAINER */}
                <aside >

                    {/* CATEGORY */}

                    <h1 className='text-xl font-semibold'>Categories</h1>

                    <div className='flex flex-col gap-2 mt-3'>

                        <div
                            onClick={() => handleFilterSelect('all')}
                            // onChange={() => handleFilterClick('all')}
                            className={`${selectNav === "all" && borderColor} cursor-pointer`}>
                            <h1>&#8250; All</h1>
                        </div>

                        <hr />

                        <div
                            onClick={() => handleFilterSelect('laptop')}
                            className={`${selectNav === "laptop" && borderColor} cursor-pointer`}
                        >
                            <h1> &#8250; Laptop</h1>
                            <hr />
                        </div>

                        <div
                            onClick={() => handleFilterSelect('electronics')}
                            className={`${selectNav === "electronics" && borderColor} cursor-pointer`}
                        >

                            <h1 > &#8250; Electronics</h1>
                            <hr />
                        </div>

                        <div
                            onClick={() => handleFilterSelect('fashion')}
                            className={`${selectNav === "fashion" && borderColor} cursor-pointer`}>
                            <h1> &#8250; Fashion</h1>
                            <hr />
                        </div>

                        <div
                            onClick={() => handleFilterSelect('phone')}
                            className={`${selectNav === "phone" && borderColor} cursor-pointer`}>
                            <h1> &#8250; Phone</h1>
                            <hr />
                        </div>
                    </div>

                    {/* END CATEGORY */}

                    {/* BRAND */}
                    <div className='mt-3'>
                        <h1 className='text-xl font-semibold'>Brand</h1>
                        <select
                            value={filterBrand}
                            onChange={handleFilterBrand}
                            className='w-full flex justify-between border-[1px] border-gray-400 cursor-pointer p-1 mt-2 outline-none'>
                            <option value=''>
                                All
                            </option>
                            <option value='lenovo'>
                                Lenovo
                            </option>
                            <option value='hp'>Hp</option>
                            <option value='samsung'>Samsung</option>
                            <option value='oppo'>oppo</option>
                            <option value='techno' >Techno</option>
                        </select>
                    </div>
                    {/*END BRAND */}

                    {/* PRICE */}
                    <div className='mt-3'>
                        <h1 className='font-semibold text-xl'>Price</h1>
                        <h2>{formatToRupiah(filterHarga)}</h2>
                        <input
                            value={filterHarga}
                            min={0}
                            max={35000000}
                            onChange={handleFilterHargaChange}
                            type="range"
                            className='w-full cursor-pointer border-none'
                        />
                    </div>
                    {/* PRICE */}

                    <button onClick={handleResetFilters} className='bg-[orangeRed] hover:bg-orange-700 text-white p-2 mt-4 rounded-md duration-300'>Clear Filters</button>

                </aside>
                {/* END LEFT CONTAINER */}


            </div>
            <div className=' flex-col flex-[0.9] flex ml-10 '>
                <RightTable />

                {/* PRODUCT LISTS */}
                <div className='' >
                    <Product_list />

                </div>
            </div>


        </div >
    )
}

export default Product