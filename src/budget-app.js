//Budget App
class ExpenseTracker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            desc: [],
            amount: []
        }
        this.handleAddTransaction = this.handleAddTransaction.bind(this)
    }

    componentDidMount(){
        try{
            const jsonDesc = localStorage.getItem('desc')
            const jsonAmount = localStorage.getItem('amount')
            const desc = JSON.parse(jsonDesc)
            const amount = JSON.parse(jsonAmount)

            if(desc && amount){
                this.setState(() => {
                    return{
                        desc:desc,
                        amount:amount
                    }
                })
            }

        }catch(e){
            console.log("Error")
        }
    }

    componentDidUpdate(prevProps, prevState){
        const desc = JSON.stringify(this.state.desc)
        const amount = JSON.stringify(this.state.amount)

        localStorage.setItem('desc',desc)
        localStorage.setItem('amount',amount)
    }

    handleAddTransaction(desc,amount){
        if(!desc ){
            return 'Please enter a valid Description to add!'
        }else if(!amount || isNaN(amount)){
            return 'Please enter a valid Amount to add!'
        }
        this.setState ((prevState) => {
            return{
                desc:prevState.desc.concat(desc),
                amount:prevState.amount.concat(Number(amount))
            }
        })
        
    }
    render(){
        return(
            <div>
                <Header title="Expense Tracker"/>
                <Balance displayText="Balance" amount={this.state.amount}/>
                <Expenses desc={this.state.desc} amount={this.state.amount} headerOne="Description" headerTwo="Amount"/>
                <AddTransaction handleAddTransaction={this.handleAddTransaction}/>

            </div>
            
        )
    }
}

////Stateless Functional Components - Classes with no state can be SFC
// Component - Header
const Header = (props) => {
    return(
        <div className="header">
            <h1>{props.title}</h1>
        </div>

    )
}

// Component - Balance
const Balance = (props) => {
    return(
        <div>
            <table className="balance">
                <tbody>
                    <tr>
                    <td>{props.displayText}</td>
                    <td>
                        {'$'+props.amount.reduce( (accumulator, curVal) => accumulator + curVal,0).toFixed(2)}
                    </td>
                    </tr>
                </tbody>   
            </table>
        </div>
    )
}

// Component - Transactions List
const Expenses = (props) => {
    return(
        <div>
        {props.desc.length === 0 && <p>Please add details below to keep track of your Expenses!</p>}
        {props.desc.length !== 0 && 
            <table>
            <thead>
                <tr>
                <th>{props.headerOne}</th>
                <th>{props.headerTwo}</th>
                </tr>
            </thead>
            <tbody>
                {props.desc.map((desc,index) => {
                    return <Expense 
                            key={index} 
                            desc={desc}
                            amount={props.amount[index]}/>
                    
                })}
            </tbody>
            </table>  
        }

        </div>
    )
}

//Display Individual Expense/Transaction
const Expense = (props) => {
    return(
        <tr>
        <td>{props.desc}</td>
        <td>{props.amount}</td>
        </tr>
        
    )
}

// Component - Add a new Transaction
class AddTransaction extends React.Component{
    constructor(props){
        super(props);
        this.handleAddExpense = this.handleAddExpense.bind(this);
        this.state = {
            error:undefined
        }
    }
    handleAddExpense(e){
            e.preventDefault();
            const desc = e.target.elements.expenseDesc.value.trim();
            const amount = e.target.elements.expenseAmount.value.trim();

            const error = this.props.handleAddTransaction(desc,amount)
            this.setState(() => {
                return{
                    error:error
                }
            })
            if(!error){
                e.target.elements.expenseDesc.value = ''
                e.target.elements.expenseAmount.value = ''
            }
    }

    render(){
        return(
            <div>
                {this.state.error && <p id="error">{this.state.error}</p>}
                <form onSubmit={this.handleAddExpense}>
                    <input type="text" name="expenseDesc" placeholder="Enter Description"/>
                    <input type="text" name="expenseAmount" placeholder="Enter Amount"/>
                    <button>Add New Expense</button>
                </form>
            </div>
        )
    }
}
ReactDOM.render(<ExpenseTracker />, document.getElementById('app'))

