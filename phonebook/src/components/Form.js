import React, { Component } from 'react'

const INITIAL_STATE = {
  contacts: [],
  name: "",
  number: "",
};


class Form extends Component {
  state = { ...INITIAL_STATE};

  handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value, });
  };
  

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE});
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Имя
          <input
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label>
          Телефон
          <input
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            onChange={this.handleInputChange}
            required
          />
        </label>

        <button type="submit" /* onClick={GoodIncrement} */>Add contact</button>
      </form>
    );
  }
}

export default Form