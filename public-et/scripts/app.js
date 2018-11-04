'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Budget App
var ExpenseTracker = function (_React$Component) {
    _inherits(ExpenseTracker, _React$Component);

    function ExpenseTracker(props) {
        _classCallCheck(this, ExpenseTracker);

        var _this = _possibleConstructorReturn(this, (ExpenseTracker.__proto__ || Object.getPrototypeOf(ExpenseTracker)).call(this, props));

        _this.state = {
            desc: [],
            amount: []
        };
        _this.handleAddTransaction = _this.handleAddTransaction.bind(_this);
        return _this;
    }

    _createClass(ExpenseTracker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var jsonDesc = localStorage.getItem('desc');
                var jsonAmount = localStorage.getItem('amount');
                var desc = JSON.parse(jsonDesc);
                var amount = JSON.parse(jsonAmount);

                if (desc && amount) {
                    this.setState(function () {
                        return {
                            desc: desc,
                            amount: amount
                        };
                    });
                }
            } catch (e) {
                console.log("Error");
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var desc = JSON.stringify(this.state.desc);
            var amount = JSON.stringify(this.state.amount);

            localStorage.setItem('desc', desc);
            localStorage.setItem('amount', amount);
        }
    }, {
        key: 'handleAddTransaction',
        value: function handleAddTransaction(desc, amount) {
            if (!desc) {
                return 'Please enter a valid Description to add!';
            } else if (!amount || isNaN(amount)) {
                return 'Please enter a valid Amount to add!';
            }
            this.setState(function (prevState) {
                return {
                    desc: prevState.desc.concat(desc),
                    amount: prevState.amount.concat(Number(amount))
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { title: 'Expense Tracker' }),
                React.createElement(Balance, { displayText: 'Balance', amount: this.state.amount }),
                React.createElement(Expenses, { desc: this.state.desc, amount: this.state.amount, headerOne: 'Description', headerTwo: 'Amount' }),
                React.createElement(AddTransaction, { handleAddTransaction: this.handleAddTransaction })
            );
        }
    }]);

    return ExpenseTracker;
}(React.Component);

////Stateless Functional Components - Classes with no state can be SFC
// Component - Header


var Header = function Header(props) {
    return React.createElement(
        'div',
        { className: 'header' },
        React.createElement(
            'h1',
            null,
            props.title
        )
    );
};

// Component - Balance
var Balance = function Balance(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'table',
            { className: 'balance' },
            React.createElement(
                'tbody',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        null,
                        props.displayText
                    ),
                    React.createElement(
                        'td',
                        null,
                        '$' + props.amount.reduce(function (accumulator, curVal) {
                            return accumulator + curVal;
                        }, 0).toFixed(2)
                    )
                )
            )
        )
    );
};

// Component - Transactions List
var Expenses = function Expenses(props) {
    return React.createElement(
        'div',
        null,
        props.desc.length === 0 && React.createElement(
            'p',
            null,
            'Please add details below to keep track of your Expenses!'
        ),
        props.desc.length !== 0 && React.createElement(
            'table',
            null,
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        null,
                        props.headerOne
                    ),
                    React.createElement(
                        'th',
                        null,
                        props.headerTwo
                    )
                )
            ),
            React.createElement(
                'tbody',
                null,
                props.desc.map(function (desc, index) {
                    return React.createElement(Expense, {
                        key: index,
                        desc: desc,
                        amount: props.amount[index] });
                })
            )
        )
    );
};

//Display Individual Expense/Transaction
var Expense = function Expense(props) {
    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            null,
            props.desc
        ),
        React.createElement(
            'td',
            null,
            props.amount
        )
    );
};

// Component - Add a new Transaction

var AddTransaction = function (_React$Component2) {
    _inherits(AddTransaction, _React$Component2);

    function AddTransaction(props) {
        _classCallCheck(this, AddTransaction);

        var _this2 = _possibleConstructorReturn(this, (AddTransaction.__proto__ || Object.getPrototypeOf(AddTransaction)).call(this, props));

        _this2.handleAddExpense = _this2.handleAddExpense.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddTransaction, [{
        key: 'handleAddExpense',
        value: function handleAddExpense(e) {
            e.preventDefault();
            var desc = e.target.elements.expenseDesc.value.trim();
            var amount = e.target.elements.expenseAmount.value.trim();

            var error = this.props.handleAddTransaction(desc, amount);
            this.setState(function () {
                return {
                    error: error
                };
            });
            if (!error) {
                e.target.elements.expenseDesc.value = '';
                e.target.elements.expenseAmount.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    { id: 'error' },
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddExpense },
                    React.createElement('input', { type: 'text', name: 'expenseDesc', placeholder: 'Enter Description' }),
                    React.createElement('input', { type: 'text', name: 'expenseAmount', placeholder: 'Enter Amount' }),
                    React.createElement(
                        'button',
                        null,
                        'Add New Expense'
                    )
                )
            );
        }
    }]);

    return AddTransaction;
}(React.Component);

ReactDOM.render(React.createElement(ExpenseTracker, null), document.getElementById('app'));
