import {Component} from 'react'
import './index.css'

class Cells extends Component {
  state = {shouldShowHiddenCells: true, isClickedOnCell: false, timerId: 0}

  componentDidMount() {
    const timer = setTimeout(() => {
      this.setState({shouldShowHiddenCells: false})
    }, 3000)
    this.setState({timerId: timer})
  }

  componentWillUnmount() {
    const {timerId} = this.state
    clearInterval(timerId)
  }

  onClickCell = () => {
    const {shouldShowHiddenCells} = this.state
    if (!shouldShowHiddenCells) {
      this.setState({isClickedOnCell: true})
    }
  }

  render() {
    const {cellData} = this.props
    const {shouldShowHiddenCells, isClickedOnCell} = this.state
    const isActive = cellData.isHidden && shouldShowHiddenCells
    const isFailed = cellData.isHidden === false && isClickedOnCell === true

    let backgroundColor
    if (isActive) {
      backgroundColor = 'yellow'
    } else if (isFailed) {
      backgroundColor = 'red'
    } else {
      backgroundColor = '#cbd5e1'
    }

    return (
      <button
        aria-label="Close Modal"
        data-testid={cellData.isHidden ? 'highlighted' : 'notHighlighted'}
        type="button"
        style={{backgroundColor}}
        onClick={this.onClickCell}
        id={cellData.id}
      >
        .
      </button>
    )
  }
}
export default Cells
