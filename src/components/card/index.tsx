import React, { Component } from "react";
import Style from "./card.module.scss";

type Props = {
  classeCss?: string;
  quantidade: string;
  titulo: string;
};

type State = {
  prop: {
    classeCss?: string;
    quantidade: string;
    titulo: string;
  } | null;
};

export default class Card extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      prop: null
    };
  }

  componentDidMount(): void {
    this.updateState(this.props); // Initial update
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps !== this.props) {
      this.updateState(this.props);
    }
  }

  updateState(props: Props) {
    this.setState({
      prop: {
        classeCss: props.classeCss,
        quantidade: props.quantidade,
        titulo: props.titulo
      }
    });
  }

  render() {
    const { prop } = this.state;
    if (!prop) return null; // Guard clause in case state is not yet set

    return (
      <>
        <ul className={Style.box}>
          <li className={Style.li}>
            <i className={prop.classeCss} id={Style.bx}></i>
            <span>
              <h3>{prop.quantidade}</h3>
              <p>{prop.titulo}</p>
            </span>
          </li>
        </ul>
      </>
    );
  }
}
