export class SSpeedBar {
  yCircle : number;
  barRepresentationId : string;
  circleRepresentationId : string
  
  constructor(initialY: number, newBarRepresentationId: string, newCircleRepresentationId : string) {
    this.yCircle = initialY;
    this.barRepresentationId = newBarRepresentationId;
    this.circleRepresentationId = newCircleRepresentationId;
  }

}