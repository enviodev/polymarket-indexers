// import { Address, BigInt } from '@graphprotocol/graph-ts';
// import { Collateral } from '../types/schema';
// import { ERC20Detailed } from '../types/templates/ERC20Detailed/ERC20Detailed';
import { Collateral, HandlerContext } from 'generated';


function getTokenName(collateralAddress: string): string {
    //   let collateralToken = ERC20Detailed.bind(collateralAddress);
    //   let result = collateralToken.try_name();

    //   return result.reverted ? '' : result.value;
    return "placeholder";
}

function getTokenSymbol(collateralAddress: string): string {
    //   let collateralToken = ERC20Detailed.bind(collateralAddress);
    //   let result = collateralToken.try_symbol();

    //   return result.reverted ? '' : result.value;
    return "placeholder";
}

export function getTokenDecimals(collateralAddress: string) {
    // let collateralToken = ERC20Detailed.bind(collateralAddress);
    // let result = collateralToken.try_decimals();

    // return result.reverted ? 0 : result.value;
    return 0;
}

export const getCollateralDetails = async (collateralAddress: string, context: HandlerContext): Promise<Collateral> => {
    let collateral = await context.Collateral.get(collateralAddress);

    if (collateral == null) {
        collateral = {
            id: collateralAddress,
            name: getTokenName(collateralAddress),
            symbol: getTokenSymbol(collateralAddress),
            decimals: getTokenDecimals(collateralAddress),
        }
        context.Collateral.set(collateral);
    }

    return collateral as Collateral;
}

// export function getCollateralScale(collateralTokenAddress: string): BigInt {
//   let collateralToken = Collateral.load(collateralTokenAddress) as Collateral;
//   return BigInt.fromI32(10).pow(<u8>collateralToken.decimals);
// }