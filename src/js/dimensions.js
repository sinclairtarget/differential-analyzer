/*
 * Represents the dimensions of a plot/graph area. The "panel" is inset by the
 * margin. The "plot" is then inset by the padding.
 */
export default class Dimensions {
  // Margin and padding should be objects with left, right, top, bottom values
  constructor(width, height, margin, padding) {
    this.width = width;
    this.height = height;
    this.margin = margin;
    this.padding = padding;
  }

  panelWidth() {
    return this.width - this.margin.left - this.margin.right;
  }

  panelHeight() {
    return this.height - this.margin.top - this.margin.bottom;
  }

  plotWidth() {
    return this.panelWidth() - this.padding.left - this.padding.right;
  }

  plotHeight() {
    return this.panelHeight() - this.padding.top - this.padding.bottom;
  }
}
