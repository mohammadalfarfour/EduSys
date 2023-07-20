<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Product;

class BarcodeScannerController extends Controller
{
    //

    public function getproduct(Request $request)
    {
        
        $barcode = $request->barcode;
        Log::error($request);
        // Retrieve the product where barcode matches the provided value
        $product = Product::where('barcode', $barcode)->first();
        $result='';
        if ($product) {
            $productName = $product->name;
            $result=$productName;
        } else {
            $result="Product not found.";
        }


        return response(['user'=>$result,
     'token'=>'1234'
    ]);
 
    }
}
