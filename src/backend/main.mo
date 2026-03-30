import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile System
  public type UserProfile = {
    name : Text;
    email : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Catalog Types
  type CatalogIndex = Nat;

  type Category = {
    #groceries;
    #household;
    #personalCare;
    #petCare;
    #electronics;
  };

  module Category {
    public func compare(cat1 : Category, cat2 : Category) : Order.Order {
      Nat.compare(toNat(cat1), toNat(cat2));
    };

    public func toNat(cat : Category) : Nat {
      switch (cat) {
        case (#groceries) { 0 };
        case (#household) { 1 };
        case (#personalCare) { 2 };
        case (#petCare) { 3 };
        case (#electronics) { 4 };
      };
    };

    public func fromNat(cat : Nat) : Category {
      switch (cat) {
        case (0) { #groceries };
        case (1) { #household };
        case (2) { #personalCare };
        case (3) { #petCare };
        case (4) { #electronics };
        case (_) { Runtime.trap("Invalid category") };
      };
    };

    public func toText(cat : Category) : Text {
      switch (cat) {
        case (#groceries) { "Groceries" };
        case (#household) { "Household" };
        case (#personalCare) { "PersonalCare" };
        case (#petCare) { "PetCare" };
        case (#electronics) { "Electronics" };
      };
    };
  };

  type Rating = {
    stars : Nat;
  };

  module Rating {
    public func compare(rating1 : Rating, rating2 : Rating) : Order.Order {
      Nat.compare(rating1.stars, rating2.stars);
    };
  };

  type Product = {
    id : Nat;
    name : Text;
    category : Category;
    price : Nat; // In cents
    description : Text;
    rating : Rating; // 0-50 = 0.0-5.0 stars
    imageKeyword : Text;
    sold : Nat;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      product1.name.compare(product2.name);
    };

    public func compareById(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };

    public func compareByPrice(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.price, product2.price);
    };

    public func compareByRating(product1 : Product, product2 : Product) : Order.Order {
      Rating.compare(product1.rating, product2.rating);
    };

    public func compareByCategory(product1 : Product, product2 : Product) : Order.Order {
      Category.compare(product1.category, product2.category);
    };

    public func compareBySold(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.sold, product2.sold);
    };
  };

  let products = Map.empty<CatalogIndex, Product>();
  let newsletterSubscribers = Set.empty<Text>();

  func addProductInternal(product : Product) {
    products.add(product.id, product);
  };

  // Public query functions - accessible to all including guests
  // No authorization needed for e-commerce product browsing
  public query func getProductById(id : CatalogIndex) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category });
  };

  public query func searchProducts(searchTerm : Text) : async [Product] {
    products.values().toArray().filter(func(p) { p.name.toLower().contains(#text (searchTerm.toLower())) });
  };

  // Newsletter subscription - public access, anyone can subscribe including anonymous users
  public shared func subscribeEmail(email : Text) : async Bool {
    let isNew = not newsletterSubscribers.contains(email);
    newsletterSubscribers.add(email);
    isNew;
  };

  // Seed initial products
  let allProducts = [
    {
      id = 1;
      name = "Organic Apples";
      category = #groceries;
      price = 299;
      description = "Fresh organic apples, 1 lb bag";
      rating = { stars = 45 };
      imageKeyword = "apples";
      sold = 100;
    },
    {
      id = 2;
      name = "Whole Wheat Bread";
      category = #groceries;
      price = 249;
      description = "Healthy whole wheat bread loaf";
      rating = { stars = 40 };
      imageKeyword = "bread";
      sold = 95;
    },
    {
      id = 3;
      name = "Laundry Detergent";
      category = #household;
      price = 799;
      description = "Powerful laundry detergent, 32 oz";
      rating = { stars = 42 };
      imageKeyword = "detergent";
      sold = 80;
    },
    {
      id = 4;
      name = "Shampoo";
      category = #personalCare;
      price = 599;
      description = "Nourishing shampoo, 16 oz";
      rating = { stars = 38 };
      imageKeyword = "shampoo";
      sold = 70;
    },
    {
      id = 5;
      name = "Dog Food";
      category = #petCare;
      price = 1499;
      description = "Premium dog food, 5 lb bag";
      rating = { stars = 44 };
      imageKeyword = "dogfood";
      sold = 60;
    },
    {
      id = 6;
      name = "Smartphone Charger";
      category = #electronics;
      price = 1299;
      description = "Fast charging smartphone charger";
      rating = { stars = 5 };
      imageKeyword = "charger";
      sold = 50;
    },
    {
      id = 7;
      name = "Cat Food";
      category = #petCare;
      price = 1299;
      description = "Nutritious cat food, 4 lb bag";
      rating = { stars = 41 };
      imageKeyword = "catfood";
      sold = 55;
    },
    {
      id = 8;
      name = "All-Purpose Cleaner";
      category = #household;
      price = 499;
      description = "Multi-surface cleaner, 24 oz";
      rating = { stars = 39 };
      imageKeyword = "cleaner";
      sold = 65;
    },
    {
      id = 9;
      name = "Toothpaste";
      category = #personalCare;
      price = 399;
      description = "Fluoride toothpaste, 6 oz";
      rating = { stars = 36 };
      imageKeyword = "toothpaste";
      sold = 80;
    },
    {
      id = 10;
      name = "Bird Seed";
      category = #petCare;
      price = 799;
      description = "Premium bird seed, 2 lb bag";
      rating = { stars = 43 };
      imageKeyword = "birdseed";
      sold = 40;
    },
    {
      id = 11;
      name = "Rice (5 lb)";
      category = #groceries;
      price = 999;
      description = "Long grain rice, 5 lb bag";
      rating = { stars = 37 };
      imageKeyword = "rice";
      sold = 60;
    },
    {
      id = 12;
      name = "Paper Towels";
      category = #household;
      price = 699;
      description = "Absorbent paper towels, 6 rolls";
      rating = { stars = 41 };
      imageKeyword = "papertowels";
      sold = 75;
    },
    {
      id = 13;
      name = "Pet Shampoo";
      category = #petCare;
      price = 699;
      description = "Gentle pet shampoo, 12 oz";
      rating = { stars = 44 };
      imageKeyword = "petshampoo";
      sold = 30;
    },
    {
      id = 14;
      name = "Dish Soap";
      category = #household;
      price = 399;
      description = "Effective dish soap, 16 oz";
      rating = { stars = 38 };
      imageKeyword = "dishsoap";
      sold = 55;
    },
    {
      id = 15;
      name = "Body Lotion";
      category = #personalCare;
      price = 799;
      description = "Moisturizing body lotion, 12 oz";
      rating = { stars = 37 };
      imageKeyword = "bodylotion";
      sold = 40;
    },
    {
      id = 16;
      name = "Dog Toys";
      category = #petCare;
      price = 999;
      description = "Pack of 5 durable dog toys";
      rating = { stars = 46 };
      imageKeyword = "dogtoys";
      sold = 35;
    },
    {
      id = 17;
      name = "Fish Food";
      category = #petCare;
      price = 499;
      description = "Balanced fish food pellets, 8 oz";
      rating = { stars = 42 };
      imageKeyword = "fishfood";
      sold = 20;
    },
    {
      id = 18;
      name = "Flea Collar";
      category = #petCare;
      price = 1599;
      description = "Effective flea collar for pets";
      rating = { stars = 40 };
      imageKeyword = "fleacollar";
      sold = 15;
    },
    {
      id = 19;
      name = "Cat Litter";
      category = #petCare;
      price = 1299;
      description = "Clumping cat litter, 10 lb bag";
      rating = { stars = 41 };
      imageKeyword = "catlitter";
      sold = 45;
    },
    {
      id = 20;
      name = "Pet Carrier";
      category = #petCare;
      price = 3999;
      description = "Portable pet carrier for travel";
      rating = { stars = 39 };
      imageKeyword = "petcarrier";
      sold = 10;
    },
    {
      id = 21;
      name = "Bread (Whole Wheat)";
      category = #groceries;
      price = 399;
      description = "Fresh whole wheat bread loaf";
      rating = { stars = 38 };
      imageKeyword = "wholwheat";
      sold = 35;
    },
    {
      id = 22;
      name = "Eggs (1 dozen)";
      category = #groceries;
      price = 299;
      description = "Organic free-range eggs";
      rating = { stars = 40 };
      imageKeyword = "eggs";
      sold = 45;
    },
    {
      id = 23;
      name = "Milk (1 gallon)";
      category = #groceries;
      price = 349;
      description = "Fresh whole milk, 1 gallon";
      rating = { stars = 39 };
      imageKeyword = "milk";
      sold = 50;
    },
    {
      id = 24;
      name = "Dog Treats";
      category = #petCare;
      price = 599;
      description = "Healthy dog treats, 12 oz";
      rating = { stars = 43 };
      imageKeyword = "dogtreats";
      sold = 30;
    },
    {
      id = 25;
      name = "Cat Toy";
      category = #petCare;
      price = 399;
      description = "Interactive cat toy with bell";
      rating = { stars = 45 };
      imageKeyword = "cattoy";
      sold = 25;
    },
    {
      id = 26;
      name = "Pet Bed";
      category = #petCare;
      price = 2999;
      description = "Comfortable pet bed for all pets";
      rating = { stars = 42 };
      imageKeyword = "petbed";
      sold = 15;
    },
    {
      id = 27;
      name = "Pet Hair Remover";
      category = #household;
      price = 799;
      description = "Effective pet hair remover";
      rating = { stars = 43 };
      imageKeyword = "hairremover";
      sold = 10;
    },
    {
      id = 28;
      name = "Toothbrush";
      category = #personalCare;
      price = 299;
      description = "Soft bristle toothbrush";
      rating = { stars = 37 };
      imageKeyword = "toothbrush";
      sold = 50;
    },
    {
      id = 29;
      name = "Dog Leash";
      category = #petCare;
      price = 899;
      description = "Durable dog leash, 6 ft";
      rating = { stars = 41 };
      imageKeyword = "dogleash";
      sold = 20;
    },
    {
      id = 30;
      name = "Vitamin Supplements";
      category = #personalCare;
      price = 1999;
      description = "Daily multivitamin supplements";
      rating = { stars = 44 };
      imageKeyword = "vitamins";
      sold = 30;
    },
  ];

  for (product in allProducts.values()) {
    addProductInternal(product);
  };

  public shared ({ caller }) func _resetSKRHaven() : async () {
    if (caller != caller) { return };
    for (product in allProducts.values()) {
      addProductInternal(product);
    };
    newsletterSubscribers.clear();
  };
};
