// 두 점 X(1), Y(2)의 거리가 dist(distance)보다 가까운지 확인하는 함수
function getIncluded(latX, lonX, latY, lonY, dist) {
    // if (Math.abs(latX - latY) * 111.19 > dist || Math.abs(lonX - lonY) * 89 > dist) return false;
    class DMS {
        constructor(coordinate) {
            this.D = Math.floor(coordinate),
            this.M = Math.floor((coordinate - this.D) * 60),
            this.S = Number(((((coordinate - this.D) * 60) - this.M) * 60).toFixed(2));
        }
    }
    const [X, Y] = [new DMS(Math.abs(latX - latY)), new DMS(Math.abs(lonX - lonY))];
    const [C, D] = [Math.cos((latX + latY) / 2) * 111.19, 111.19];
    return {C, D}
    const distance = Math.sqrt()
}

module.exports = getIncluded;