export class SNavigationBar {
  xCircle : number;
  barRepresentationId : string;
  circleRepresentationId : string
  
  constructor(initialX: number, newBarRepresentationId: string, newCircleRepresentationId : string) {
    this.xCircle = initialX;
    this.barRepresentationId = newBarRepresentationId;
    this.circleRepresentationId = newCircleRepresentationId;
  }

}