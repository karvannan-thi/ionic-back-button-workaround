import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import {
  ActionSheetController,
  AlertController,
  MenuController,
  ModalController,
  NavController,
  PickerController,
  Platform,
  PopoverController,
} from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class BackwardGuard implements CanDeactivate<any> {
  private isPop: boolean;

  constructor(
    private platform: Platform,
    private router: Router,
    private location: Location,
    private navController: NavController,
    private menuController: MenuController,
    private alertController: AlertController,
    private pickerController: PickerController,
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) {}

  async canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Promise<boolean> {
    if (!this.platform.is('mobileweb')) {
      return true;
    }

    const currentNavigation = this.router.getCurrentNavigation();
    const backButtonPressed = currentNavigation.trigger === 'popstate';

    if (!backButtonPressed || this.isPop) {
      return true;
    }

    // Workaround for history being broken
    // https://github.com/angular/angular/issues/13586#issuecomment-458241789
    this.location.go(currentState.url);

    // Hide menu
    const isMenuOpen = await this.menuController.isOpen();
    if (isMenuOpen) {
      this.menuController.close();
      return false; // Prevent navigation
    }

    // Hide overlays
    const activeController =
      (await this.alertController.getTop()) ||
      (await this.pickerController.getTop()) ||
      (await this.actionSheetController.getTop()) ||
      (await this.popoverController.getTop()) ||
      (await this.modalController.getTop());
    if (activeController) {
      activeController.dismiss();
      return false; // Prevent navigation
    }

    // Pop
    this.isPop = true;
    this.navController.pop().then(() => {
      this.isPop = false;
    });

    return false; // Prevent navigation
  }
}