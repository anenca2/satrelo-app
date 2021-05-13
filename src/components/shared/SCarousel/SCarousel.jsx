/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SCarousel.module.css';
import {
    Carousel,
    CarouselControl,
    CarouselItem,
} from 'reactstrap';

import SAvatarItem from './SAvatarIem';
import SSkinItem from './SSkinItem';

class SCarousel extends Component {
    render() {
        const { kind } = this.props;
        let base = styles.style;
        if (kind !== 'avatar')
            base = `${base} ${styles.border}`;

        return(
            <Carousel
                className={base}
                activeIndex={this.state.activeIndex}
                interval={false}
                next={this.next}
                previous={this.previous}>
                
                {this.buildItems()}

                <CarouselControl
                    direction='prev'
                    onClickHandler={this.previous} />
                <CarouselControl 
                    direction='next'
                    onClickHandler={this.next} />
            </Carousel>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            animating: false,
        };
        this.animateItem = this.animateItem.bind(this);
        this.buildItems = this.buildItems.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    /** Métodos extra */
    animateItem(animate) {
        this.setState({ animating: animate });
    }

    /** Construir los items que component el Carousel */
    buildItems() {
        return this.props.items.map((item) => {
            return(
                <CarouselItem
                    key={item.id}
                    onExiting={() => { this.animateItem(true); }}
                    onExited={() => { this.animateItem(false); }}>
                    {
                        this.props.kind === 'avatar' ?
                        <SAvatarItem item={item} />
                        :
                        <SSkinItem 
                            {...item} 
                            userId={this.props.userId} />
                    }
                </CarouselItem>
            );
        });
    }

    goToIndex(newIndex) {
        if (this.state.animating)
            return
        this.setState({ activeIndex: newIndex });
        this.onCarouselChanged(newIndex);
    }

    next() {
        if (this.state.animating)
            return
        
        let nextIndex = this.state.activeIndex === this.props.items.length - 1 ?
                        0 : this.state.activeIndex + 1;
        this.setState({ activeIndex : nextIndex });
        this.onCarouselChanged(nextIndex);
    }

    previous() {
        if (this.state.animating)
            return
        
        let nextIndex = this.state.activeIndex === 0 ?
                        this.props.items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
        this.onCarouselChanged(nextIndex);
    }

    onCarouselChanged(index) {
        const selected = this.props.items[index];
        this.props.onCarouselChanged(selected);
    }
}

export default SCarousel;